(function(root){
'use strict';
function blank(){return{clue:0,highest:0,attempts:0,solved:false,finalScore:null,finalClues:null,marks:{},notes:'',answer:{killer:'',weapon:'',time:''},rejected:[]};}
function normalize(raw,c){
 const s=blank();if(!raw||typeof raw!=='object'||Array.isArray(raw))return s;
 const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
 s.highest=integer(raw.highest,0,c.clues.length-1)?raw.highest:0;
 s.clue=integer(raw.clue,0,s.highest)?raw.clue:0;
 s.attempts=integer(raw.attempts,0,100000)?raw.attempts:0;
 if(typeof raw.notes==='string')s.notes=raw.notes.slice(0,3000);
 if(raw.marks&&typeof raw.marks==='object'&&!Array.isArray(raw.marks))for(const [k,v]of Object.entries(raw.marks))if(/^[0-3]-[0-3]-[0-3]$/.test(k)&&[1,2].includes(v))s.marks[k]=v;
 for(const id of ['killer','weapon','time']){const allowed=id==='killer'?c.suspects.map(p=>p.id):id==='weapon'?c.weapons.map(w=>w.id):c.times;s.answer[id]=allowed.includes(raw.answer?.[id])?raw.answer[id]:'';}
 if(Array.isArray(raw.rejected))s.rejected=[...new Set(raw.rejected.filter(x=>typeof x==='string'&&/^\d\|\d\|\d{2}:\d{2}$/.test(x)))].slice(0,48);
 if(raw.solved===true&&Object.keys(c.answer).every(k=>s.answer[k]===c.answer[k])){s.solved=true;s.finalClues=integer(raw.finalClues,1,s.highest+1)?raw.finalClues:s.highest+1;s.finalScore=Math.max(0,100-(s.finalClues-1)*6-s.attempts*15);}
 return s;
}
root.RahasyaState={blank,normalize};if(typeof module!=='undefined')module.exports=root.RahasyaState;
})(typeof window!=='undefined'?window:globalThis);
