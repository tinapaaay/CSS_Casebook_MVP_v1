/* Run with Playwright available: CASEBOOK_URL=http://127.0.0.1:8765 node tests/browser.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const base = process.env.CASEBOOK_URL || 'http://127.0.0.1:8765';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || (fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined) });
  const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page = await context.newPage();
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  const matrix=[];
  for(let number=1;number<=48;number++) {
    const id=String(number).padStart(3,'0');
    await page.goto(`${base}/case.html?id=${id}`);
    await page.locator('#css-editor').waitFor();
    const data=await page.evaluate(id=>window.CASEBOOK_CASES[id],id);
    const check=async css=>{
      await page.locator('#css-editor').fill(css);
      await page.locator('#check-button').click();
      await page.waitForFunction(()=>!document.querySelector('#check-button').disabled);
      return {ok:await page.locator('#validation-message').evaluate(el=>el.classList.contains('is-success')),message:await page.locator('#validation-message').innerText()};
    };
    const starter=await check(data.starterCSS);
    const correct=await check(data.recommendedCSS);
    matrix.push({id,starter:starter.ok?'FAIL (accepted)':'pass',solution:correct.ok?'pass':correct.message});
    console.log(`${id}: starter ${!starter.ok}, recommended ${correct.ok}${correct.ok?'':' '+correct.message}`);
  }
  fs.writeFileSync(path.join(__dirname,'../outputs/case-matrix.json'),JSON.stringify(matrix,null,2));
  const layout=[];
  for(const width of [1440,1024,768,390,320]) {
    await page.setViewportSize({width,height:1000});
    for(const route of ['index.html','cases.html','field-guide.html#chapter-01','case.html?id=001']) {
      await page.goto(`${base}/${route}`);
      const overflowing=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
      layout.push({width,route,...overflowing});
      if(width===1440 || width===390 || width===320) await page.screenshot({path:path.join(__dirname,`../outputs/${route.split('.')[0]}-${width}.png`),fullPage:true});
    }
  }
  fs.writeFileSync(path.join(__dirname,'../outputs/layout-matrix.json'),JSON.stringify(layout,null,2));
  console.log('Overflow:',layout.filter(x=>x.scroll>x.width+1));
  console.log('Page errors:',errors);
  await browser.close();
  assert.equal(errors.length,0,'No browser errors');
  assert.ok(matrix.every(x=>x.starter==='pass' && x.solution==='pass'),'Every starter must fail and recommended solution pass');
  assert.ok(layout.every(x=>x.scroll<=x.width+1),'Pages must fit every tested viewport');
})().catch(e=>{console.error(e);process.exitCode=1});
