const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function setup() {
  const data = new Map();
  let failKey;
  const storage = {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => { if(key === failKey) { failKey = undefined; throw new Error('Quota exceeded'); } data.set(key, String(value)); },
    removeItem: key => data.delete(key), key: index => [...data.keys()][index],
    get length() { return data.size; }
  };
  const localStorage = new Proxy(storage, {
    ownKeys:()=>[...data.keys()], getOwnPropertyDescriptor:()=>({enumerable:true,configurable:true})
  });
  const window = {dispatchEvent(){}};
  const ctx=vm.createContext({window,localStorage,document:{querySelectorAll:()=>[],querySelector:()=>null},CustomEvent:class{},console});
  for (const name of ['curriculum-data.js','progress.js']) vm.runInContext(fs.readFileSync(path.join(__dirname,'..',name),'utf8'),ctx);
  return {p:window.CasebookProgress, data, put:(id,value)=>storage.setItem(`css-casebook-c${id}`,JSON.stringify(value)), set:(key,value)=>storage.setItem(key,value), failOn:key=>failKey=key};
}
test('curriculum mapping and sequence use the shared registry',()=>{
  const {p}=setup();
  assert.deepEqual(Array.from(p.chapterCaseIds('02')),['007','008','009']);
  assert.deepEqual(Array.from(p.chapterCaseIds('09')),['004','005','006']);
  assert.equal(p.curriculumOrder[p.curriculumOrder.indexOf('003')+1],'007');
});
test('resume excludes resolved and unknown cases',()=>{
  const {p,set,put}=setup();
  set('css-casebook-session',JSON.stringify({lastVisitedCase:'007'}));
  assert.equal(p.getState().resumeId,'007');
  put('007',{completed:true}); assert.equal(p.getState().resumeId,null);
  set('css-casebook-session',JSON.stringify({lastVisitedCase:'999'})); assert.equal(p.getState().resumeId,null);
});
test('all 48 investigations finish case progress without implying chapter completion',()=>{
  const {p,put}=setup();
  p.curriculumOrder.forEach(id=>put(id,{completed:true}));
  const state=p.getState();
  assert.equal(state.percent,100); assert.equal(state.allComplete,true);
  assert.equal(state.nextId,null); assert.equal(state.resumeId,null); assert.equal(state.chaptersCompleted,0);
});
test('chapter completion requires lessons, cases and a passed review',()=>{
  const {p,put,set}=setup();
  ['001','002','003'].forEach(id=>put(id,{completed:true}));
  for(let i=1;i<=3;i++)set(`css-casebook-lesson-01-${i}`,'complete');
  assert.equal(p.getChapterState('01').complete,false);
  set('css-casebook-review-01',JSON.stringify({completed:true}));
  assert.equal(p.getChapterState('01').complete,true); assert.equal(p.getState().chaptersCompleted,1);
});
test('legacy Flexbox review completion remains readable',()=>{
  const {p,set}=setup();
  set('css-casebook-ch09',JSON.stringify({reviewCompleted:true}));
  assert.equal(p.getChapterState('09').reviewCompleted,true);
});
test('invalid imports leave every current record intact',()=>{
  const {p,set,data}=setup(); set('css-casebook-c001','{"completed":true}'); set('other-app','keep');
  const before=JSON.stringify([...data]);
  for(const storage of [[],{'other-app':'bad'},{'css-casebook-c999':'{}'},{'css-casebook-c001':'null'},{'css-casebook-c001':'{"completed":"yes"}'},{'css-casebook-c001':'{"hintCount":7}'},{'css-casebook-c001':'not-json'}]) {
    assert.throws(()=>p.importProgress({version:1,storage})); assert.equal(JSON.stringify([...data]),before);
  }
  assert.throws(()=>p.importProgress({version:2,storage:{}}));
});
test('complete exports including chapter summaries round-trip',()=>{
  const {p,set,data}=setup(); set('other-app','keep');
  const storage={'css-casebook-c007':'{"css":".test {}","hintCount":2,"visited":true,"attempted":true}', 'css-casebook-lesson-01-1':'complete','css-casebook-review-01':'{"completed":true,"bestScore":3}','css-casebook-ch09':'{"reviewCompleted":true}', 'css-casebook-ch01-status':'in-progress'};
  p.importProgress({version:1,storage});
  for(const [key,value] of Object.entries(storage))assert.equal(data.get(key),value);
  assert.equal(data.get('other-app'),'keep');
});
test('failed writes roll back to the previous saved progress',()=>{
  const {p,set,data,failOn}=setup();set('css-casebook-c001','{"completed":true}');
  failOn('css-casebook-c002');
  assert.throws(()=>p.importProgress({version:1,storage:{'css-casebook-c001':'{}','css-casebook-c002':'{}'}}));
  assert.equal(data.get('css-casebook-c001'),'{"completed":true}'); assert.equal(data.has('css-casebook-c002'),false);
});
test('reset removes only Casebook records',()=>{
  const {p,set,data}=setup(); set('css-casebook-c001','{}'); set('other-app','keep'); p.resetProgress();
  assert.equal(data.size,1); assert.equal(data.get('other-app'),'keep');
});
