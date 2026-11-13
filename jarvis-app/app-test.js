"use strict";
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const testPort = String(20000 + Math.floor(Math.random() * 20000));
const origin = 'http://127.0.0.1:' + testPort;
const child = spawn(process.execPath, ['server.js'], {cwd:__dirname,env:{...process.env,PORT:testPort,GEMINI_API_KEY:'',JARVIS_ACCESS_CODE:''},stdio:'ignore'});
async function waitForServer(){for(let i=0;i<60;i++){try{const r=await fetch(origin+'/healthz');if(r.ok)return}catch(e){}await new Promise(resolve=>setTimeout(resolve,60))}throw Error('JARVIS server did not start')}
async function ask(message,history=[]){let r=await fetch(origin+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history})});assert.equal(r.status,200);return r.json()}
(async()=>{try{
await waitForServer();const st=await(await fetch(origin+'/api/status')).json();assert.equal(st.brainAvailable,true);assert.equal(st.aiAvailable,false);assert.equal(st.brainMode,'rules');
let v=await ask('Calculate the 7% stop for $120');assert.match(v.reply,/111\.60/);assert.equal(v.source,'axiom-core');
v=await ask('Explain the two-day volume flag');assert.match(v.reply,/previous two/i);
v=await ask('What is live market strength now?');assert.match(v.reply,/no verified live market/i);
v=await ask('What is the minimum stock price and volume?');assert.match(v.reply,/\$50/);
const page=await(await fetch(origin+'/')).text();assert.match(page,/JARVIS Brain Status/);
console.log('JARVIS Brain v4 tests passed: core, risk math, volume, live-data boundary, web UI');
}catch(err){console.error(err);process.exitCode=1}finally{child.kill()}})();