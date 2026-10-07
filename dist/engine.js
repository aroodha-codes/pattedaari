(function(root){
'use strict';
const settings=[
{title:'ಮಲೆನಾಡಿನ ಬಂಗಲೆಯ ರಹಸ್ಯ',intro:'ಮಳೆಯ ರಾತ್ರಿ. ಬಂಗಲೆಯ ಬಾಗಿಲು ಒಳಗಿನಿಂದ ಮುಚ್ಚಿದೆ. ನಾಲ್ವರಲ್ಲಿ ಒಬ್ಬರ ಸಾವು, ಉಳಿದ ಮೂವರ ಹೇಳಿಕೆಗಳು. ಸತ್ಯವನ್ನು ಕಂಡುಹಿಡಿಯುವುದು ನಿಮ್ಮ ಕೆಲಸ.',rooms:[['🍳','ಅಡುಗೆಮನೆ'],['🛋️','ವಿಶ್ರಾಂತಿ ಕೋಣೆ'],['📚','ಗ್ರಂಥಾಲಯ'],['🌿','ಒಳತೋಟ']]},
{title:'ಹಳೆಯ ರಂಗಮಂದಿರದ ಕೊನೆಯ ದೃಶ್ಯ',intro:'ನಾಟಕದ ಅಭ್ಯಾಸ ಮುಗಿದಿದೆ. ಆದರೆ ತೆರೆಯ ಹಿಂದೆ ಒಂದು ರಹಸ್ಯ ಉಳಿದಿದೆ. ನಾಲ್ವರು ಒಳಗೆ ಬಂದಿದ್ದರು; ಈಗ ಮೂವರು ಅನುಮಾನಿತರಾಗಿದ್ದಾರೆ.',rooms:[['🎭','ವೇಷಭೂಷಣ ಕೋಣೆ'],['🎟️','ಪ್ರವೇಶ ಕೋಣೆ'],['🎹','ಸಂಗೀತ ಕೋಣೆ'],['🎬','ಅಭ್ಯಾಸ ಕೋಣೆ']]},
{title:'ಅತಿಥಿಗೃಹದ ನಿಶ್ಶಬ್ದ ರಾತ್ರಿ',intro:'ಬೆಟ್ಟದ ಮೇಲಿನ ಅತಿಥಿಗೃಹದಲ್ಲಿ ನಾಲ್ವರು ಮಾತ್ರ ಉಳಿದಿದ್ದಾರೆ. ಒಂದು ಸಾವಿನ ಸುದ್ದಿ ರಾತ್ರಿಯ ಶಾಂತಿಯನ್ನು ಮುರಿದಿದೆ. ಅವರ ಹೆಜ್ಜೆಗಳೇ ನಿಮಗೆ ದಾರಿ ತೋರಬೇಕು.',rooms:[['☕','ಚಹಾ ಕೋಣೆ'],['🪑','ಊಟದ ಕೋಣೆ'],['🛏️','ಅತಿಥಿ ಕೋಣೆ'],['🌱','ಸಸ್ಯಗಳ ಕೋಣೆ']]},
{title:'ಸಂಗ್ರಹಾಲಯದಲ್ಲಿ ಮುಚ್ಚಿದ ಕಡತ',intro:'ಸಂಗ್ರಹಾಲಯ ಮುಚ್ಚಿದ ನಂತರ ಒಳಗೆ ನಾಲ್ವರು ಉಳಿದಿದ್ದರು. ಮುಂಜಾನೆಗೆ ಮುನ್ನ ನಡೆದ ಘಟನೆಯನ್ನು ಸಾಕ್ಷ್ಯ ಮತ್ತು ಹೇಳಿಕೆಗಳಿಂದ ಬಿಡಿಸಿ.',rooms:[['📦','ಉಗ್ರಾಣ'],['🖼️','ಚಿತ್ರಶಾಲೆ'],['🏺','ಪ್ರಾಚ್ಯವಸ್ತು ಕೋಣೆ'],['🔎','ಅಧ್ಯಯನ ಕೋಣೆ']]},
{title:'ಸಂಗೀತ ಶಾಲೆಯ ಮೌನ',intro:'ಸಂಗೀತದ ಸಂಜೆ ಮುಗಿದಿದೆ. ಶಾಲೆಯೊಳಗೆ ಉಳಿದ ನಾಲ್ವರ ನಡುವೆ ಏನು ನಡೆಯಿತು? ಸಮಯ, ಸ್ಥಳ ಮತ್ತು ಆಯುಧದ ಸುಳಿವುಗಳನ್ನು ಜೋಡಿಸಿ.',rooms:[['🥁','ವಾದ್ಯಗಳ ಕೋಣೆ'],['🪑','ವಿಶ್ರಾಂತಿ ಕೋಣೆ'],['🎼','ಅಭ್ಯಾಸ ಕೋಣೆ'],['📚','ಓದುವ ಕೋಣೆ']]}
];
const people=[['ಆದಿತ್ಯ','ಛಾಯಾಗ್ರಾಹಕ'],['ಕಾವ್ಯ','ಲೇಖಕಿ'],['ನಿಖಿಲ್','ಶಿಕ್ಷಕ'],['ಮೀರಾ','ಸಂಗೀತಗಾರ್ತಿ'],['ವಿಕ್ರಮ್','ಸಂಪಾದಕ'],['ದೀಪಾ','ಸಂಶೋಧಕಿ'],['ರವಿ','ಚಿತ್ರಕಾರ'],['ಅನನ್ಯಾ','ವಿನ್ಯಾಸಕಿ']];
function seedFor(s){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function dateKey(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);}
function validDate(key){if(typeof key!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(key))return false;const d=new Date(key+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===key;}
function previousDate(key,offset){if(!validDate(key)||!Number.isInteger(offset)||offset<0||offset>36600)throw Error('Invalid date offset');const d=new Date(key+'T12:00:00+05:30');d.setUTCDate(d.getUTCDate()-offset);return dateKey(d);}
function createCase(key,mode='easy'){
if(!validDate(key)||!['easy','hard'].includes(mode))throw Error('Invalid case');
const seed=seedFor(key),r=rng(seed),setting=settings[seed%settings.length],cast=shuffle(people,r).slice(0,4).map((p,i)=>({id:String(i),name:p[0],role:p[1]}));
const [k,a,b,v]=cast,rooms=setting.rooms.map((x,i)=>({id:String(i),icon:x[0],name:x[1]})),suspects=shuffle(cast.slice(0,3),r);
const start=18+Math.floor(r()*5),times=Array.from({length:4},(_,i)=>`${String(start).padStart(2,'0')}:${String(i*15).padStart(2,'0')}`);
const w0=r()>.5?['🔨','ಸುತ್ತಿಗೆ']:['🪢','ಹಗ್ಗ'];
const weapons=[w0,['🗡️','ಚೂರಿ'],['⚗️','ವಿಷ'],w0[1]==='ಹಗ್ಗ'?['🔨','ಸುತ್ತಿಗೆ']:['🪢','ಹಗ್ಗ']].map((x,i)=>({id:String(i),icon:x[0],name:x[1],room:String(i)}));
const loc=i=>`“${rooms[i].name}”`,t=times;
const clues=[
{type:'ಧ್ವನಿ ದಾಖಲೆ',text:`${t[1]}ಕ್ಕೆ ${v.name} ಅವರ ಧ್ವನಿ ಸಂದೇಶ ದಾಖಲಾಗಿದೆ. ಆ ಕ್ಷಣದಲ್ಲಿ ಅವರು ${loc(2)} ಸ್ಥಳದಲ್ಲಿ ಜೀವಂತವಾಗಿದ್ದರು.`},
{type:'ಪತ್ತೆಯಾದ ಸಮಯದ ಸಾಕ್ಷ್ಯ',text:`${t[3]}ಕ್ಕೆ ${b.name} ಅವರು ${loc(2)} ಸ್ಥಳಕ್ಕೆ ಬಂದಾಗ ಶವ ಮಾತ್ರ ಇತ್ತು. ಅವರು ಬರುವ ಮೊದಲೇ ಸಾವು ಸಂಭವಿಸಿತ್ತು ಎಂಬುದನ್ನು ಸ್ವಯಂಚಾಲಿತ ಕ್ಯಾಮೆರಾ ದೃಢಪಡಿಸಿದೆ.`},
{type:'ಸ್ಥಳದ ದಾಖಲೆ',text:`${t[2]}ರ ಭದ್ರತಾ ಚಿತ್ರದಲ್ಲಿ ${a.name} ಅವರು ${loc(0)} ಸ್ಥಳದಲ್ಲಿರುವುದು ಸ್ಪಷ್ಟವಾಗಿದೆ. ಚಿತ್ರದ ಸಮಯವನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.`},
{type:mode==='hard'?'ಅನುಮಾನಿತರ ಹೇಳಿಕೆ':'ಭದ್ರತಾ ದಾಖಲೆ',text:mode==='hard'?`${k.name}: “${t[2]}ಕ್ಕೆ ನಾನು ${loc(0)} ಸ್ಥಳದಲ್ಲಿ ${a.name} ಅವರ ಜೊತೆ ಇದ್ದೆ.”`:`${t[2]}ರ ಮತ್ತೊಂದು ಭದ್ರತಾ ಚಿತ್ರದಲ್ಲಿ ${b.name} ಅವರು ${loc(3)} ಸ್ಥಳದಲ್ಲಿರುವುದು ಸ್ಪಷ್ಟವಾಗಿದೆ.`},
{type:'ಚಲನವಲನದ ದಾಖಲೆ',text:`${k.name} ಅವರು ${t[0]}ಕ್ಕೆ ${loc(0)} ಸ್ಥಳದಲ್ಲೂ, ${t[1]}ಕ್ಕೆ ${loc(1)} ಸ್ಥಳದಲ್ಲೂ ಇದ್ದರು. ಎರಡೂ ಸಮಯಗಳಲ್ಲಿ ಆ ಸ್ಥಳದಲ್ಲಿ ಬೇರೆ ಯಾರೂ ಇರಲಿಲ್ಲ.`},
{type:'ವೈದ್ಯಕೀಯ ಸುಳಿವು',text:'ಶವದ ಮೇಲೆ ಚುಚ್ಚಿದ ಅಥವಾ ಕತ್ತರಿಸಿದ ಗಾಯಗಳಿಲ್ಲ. ಆದ್ದರಿಂದ ಚೂರಿಯನ್ನು ಬಳಸಿಲ್ಲ. ಈ ಸುಳಿವು ಮಾತ್ರದಿಂದ ಉಳಿದ ಆಯುಧಗಳನ್ನು ತಳ್ಳಿಹಾಕಲು ಸಾಧ್ಯವಿಲ್ಲ.'},
{type:mode==='hard'?'ಪರಿಶೀಲಿಸಿದ ಸಾಕ್ಷ್ಯ':'ಅನುಮಾನಿತರ ಹೇಳಿಕೆ',text:mode==='hard'?`${t[2]}ಕ್ಕೆ ${loc(0)} ಸ್ಥಳದಲ್ಲಿ ${a.name} ಒಬ್ಬರೇ ಇದ್ದರು. ಅದೇ ಸಮಯದಲ್ಲಿ ${b.name} ಅವರು ${loc(3)} ಸ್ಥಳದಲ್ಲಿದ್ದರು. ಎರಡೂ ಅಂಶಗಳನ್ನು ಭದ್ರತಾ ದಾಖಲೆಗಳು ದೃಢಪಡಿಸುತ್ತವೆ.`:`${a.name}: “${t[1]}ರಿಂದ ${t[2]}ರವರೆಗೆ ನಾನು ${loc(0)} ಸ್ಥಳದಲ್ಲೇ ಇದ್ದೆ. ನನ್ನ ಜೊತೆ ಯಾರೂ ಇರಲಿಲ್ಲ.”`},
{type:'ತನಿಖೆಯ ನೆನಪು',text:`ಘಟನೆ ನಡೆಯುವ ಸಮಯಕ್ಕಿಂತ ಮೊದಲು ಆಯುಧವನ್ನು ತೆಗೆದುಕೊಂಡಿರಬೇಕು. ಮೊದಲ ದಾಖಲೆಯ ಸಮಯ ${t[0]}. ಆಯುಧಗಳನ್ನು ಬೇರೆ ಯಾರೂ ಸ್ಥಳಾಂತರಿಸಿಲ್ಲ. ಅಪರಾಧಿ ಅದನ್ನು ತೆಗೆದುಕೊಳ್ಳುವಾಗ ಒಬ್ಬರೇ ಇದ್ದರು.`}
];
return {key,mode,title:setting.title,intro:setting.intro,cast,suspects,victim:v,rooms,weapons,times,clues,answer:{killer:k.id,weapon:'0',time:t[2]},routes:{[k.id]:[0,1,2,3],[a.id]:[1,0,0,1],[b.id]:[2,3,3,2],[v.id]:[3,2,2,2]},explanation:[`${v.name} ಅವರು ${t[1]}ಕ್ಕೆ ಜೀವಂತವಾಗಿದ್ದರು. ${t[3]}ಕ್ಕೆ ಶವ ಪತ್ತೆಯಾಯಿತು. ಆದ್ದರಿಂದ ಘಟನೆ ನಡೆದದ್ದು ${t[2]}ಕ್ಕೆ.`,`${t[2]}ಕ್ಕೆ ${a.name} ಅವರು ${loc(0)} ಸ್ಥಳದಲ್ಲಿ ಮತ್ತು ${b.name} ಅವರು ${loc(3)} ಸ್ಥಳದಲ್ಲಿದ್ದರು. ಹೀಗಾಗಿ ${loc(2)} ಸ್ಥಳದಲ್ಲಿ ಘಟನೆ ನಡೆಸಬಹುದಾದ ಏಕೈಕ ವ್ಯಕ್ತಿ ${k.name}.`,`${k.name} ಅವರು ಘಟನೆಗೂ ಮೊದಲು ಭೇಟಿ ನೀಡಿದ ಸ್ಥಳಗಳು ${loc(0)} ಮತ್ತು ${loc(1)}. ಚೂರಿಯನ್ನು ವೈದ್ಯಕೀಯ ಸುಳಿವು ತಳ್ಳಿಹಾಕುತ್ತದೆ. ಆದ್ದರಿಂದ ${loc(0)} ಸ್ಥಳದಲ್ಲಿದ್ದ ${weapons[0].name} ಮಾತ್ರ ಸಾಧ್ಯ.`,...(mode==='hard'?[`${k.name} ಅವರು ${t[2]}ಕ್ಕೆ ${a.name} ಜೊತೆ ಇದ್ದೆನೆಂಬ ಹೇಳಿಕೆ ಸುಳ್ಳು. ಭದ್ರತಾ ದಾಖಲೆ ಅದನ್ನು ಖಂಡಿಸುತ್ತದೆ.`]:[])]};
}
function checkAnswer(c,a){if(!a||typeof a!=='object'||!c.suspects.some(x=>x.id===a.killer)||!c.weapons.some(x=>x.id===a.weapon)||!c.times.includes(a.time))throw Error('ಮೂರು ಉತ್ತರಗಳನ್ನೂ ಆಯ್ಕೆ ಮಾಡಿ.');return Object.keys(c.answer).every(k=>a[k]===c.answer[k]);}
function score(highest,attempts){return Math.max(0,100-highest*6-attempts*15);}
root.Rahasya={createCase,dateKey,previousDate,checkAnswer,score,validDate};
if(typeof module!=='undefined')module.exports=root.Rahasya;
})(typeof window!=='undefined'?window:globalThis);
