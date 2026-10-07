const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../dist/engine.js');
const S=require('../dist/state.js');

test('365 dates × two modes: deterministic cases, valid routes and unique answers',()=>{
 for(let day=0;day<365;day++)for(const mode of ['easy','hard']){
  const date=E.previousDate('2026-10-07',day),c=E.createCase(date,mode);
  assert.deepEqual(c,E.createCase(date,mode));assert.equal(new Set(c.cast.map(p=>p.name)).size,4);
  for(const path of Object.values(c.routes))for(let i=1;i<path.length;i++)assert.ok(Math.abs(path[i]-path[i-1])<=1);
  // Independent deductions: alive at slot 1; independently dead before slot 3.
  const deathSlots=c.times.map((_,i)=>i).filter(i=>i>1&&i<3);assert.deepEqual(deathSlots,[2]);
  // Verified records place the two non-killers in rooms 0 and 3 at death.
  const possibleKillers=c.suspects.filter(p=>c.routes[p.id][deathSlots[0]]===2);assert.equal(possibleKillers.length,1);
  const killer=possibleKillers[0];assert.equal(killer.id,c.answer.killer);
  // Only rooms visited strictly before the murder count; stabbing is excluded.
  const possibleWeapons=c.weapons.filter(w=>w.id!=='1'&&c.routes[killer.id].slice(0,deathSlots[0]).includes(Number(w.room)));
  assert.equal(possibleWeapons.length,1);assert.equal(possibleWeapons[0].id,c.answer.weapon);
  // The weapon was picked up while the killer was alone.
  const pick=c.routes[killer.id].indexOf(Number(c.answer.weapon));assert.ok(pick<2);
  assert.equal(c.cast.filter(p=>c.routes[p.id][pick]===Number(c.answer.weapon)).length,1);
  let accepted=0;for(const p of c.suspects)for(const w of c.weapons)for(const time of c.times)accepted+=Number(E.checkAnswer(c,{killer:p.id,weapon:w.id,time}));assert.equal(accepted,1);
  assert.match(c.clues[1].text,/ಕ್ಯಾಮೆರಾ/); // Time-of-death witness is independently verified in hard mode too.
 }
});
test('India date boundary, leap day and year boundary',()=>{
 assert.equal(E.dateKey(new Date('2026-10-07T18:29:59Z')),'2026-10-07');
 assert.equal(E.dateKey(new Date('2026-10-07T18:30:00Z')),'2026-10-08');
 assert.equal(E.previousDate('2024-03-01',1),'2024-02-29');
 assert.equal(E.previousDate('2026-01-01',1),'2025-12-31');
});
test('impossible dates, invalid modes and date offsets rejected',()=>{
 for(const key of ['2026-02-30','2026-99-01','2026-2-01','x',null,undefined])assert.throws(()=>E.createCase(key));
 assert.throws(()=>E.createCase('2026-10-07','unknown'));assert.throws(()=>E.previousDate('2026-10-07',-1));
 assert.throws(()=>E.previousDate('bad',2));assert.throws(()=>E.previousDate('2026-10-07',NaN));
});
test('incomplete, wrong types, unknown IDs and victim accusations rejected',()=>{
 const c=E.createCase('2026-10-07');
 for(const a of [null,{},[],{...c.answer,killer:0},{...c.answer,killer:c.victim.id},{...c.answer,time:'25:99'},{...c.answer,weapon:'9'}])assert.throws(()=>E.checkAnswer(c,a));
 assert.equal(E.checkAnswer(c,c.answer),true);
});
test('score floor and clue costs',()=>{assert.equal(E.score(0,0),100);assert.equal(E.score(7,0),58);assert.equal(E.score(7,8),0);});
test('corrupt and partial save data normalized without spreading unknown fields',()=>{
 const c=E.createCase('2026-10-07');
 for(const raw of [null,[],42,'string'])assert.deepEqual(S.normalize(raw,c),S.blank());
 const s=S.normalize({clue:99,highest:-1,attempts:-5,solved:'yes',marks:{'0-0-0':1,'0-0-1':2,'0-0-2':99,'evil':1},notes:'ಕ'.repeat(4000),answer:{killer:'99'},evil:true},c);
 assert.equal(s.clue,0);assert.equal(s.highest,0);assert.equal(s.attempts,0);assert.equal(s.solved,false);assert.equal(s.notes.length,3000);
 assert.deepEqual(s.marks,{'0-0-0':1,'0-0-1':2});assert.equal(s.evil,undefined);
});
test('solved state requires a correct answer; final score cannot load outside valid range',()=>{
 const c=E.createCase('2026-10-07');
 assert.equal(S.normalize({solved:true,answer:{},finalScore:900},c).solved,false);
 const s=S.normalize({solved:true,answer:c.answer,highest:7,clue:7,attempts:1,finalClues:4,finalScore:900},c);
 assert.equal(s.solved,true);assert.equal(s.finalScore,67);assert.equal(s.finalClues,4);
});
test('old saves stay compatible and repeated guesses are bounded',()=>{
 const c=E.createCase('2026-10-07'),s=S.normalize({highest:5,clue:4,attempts:1,marks:{'0-0-0':1},notes:'ಗಮನಿಕೆ',answer:{killer:c.suspects[0].id}},c);
 assert.equal(s.notes,'ಗಮನಿಕೆ');assert.equal(s.marks['0-0-0'],1);assert.equal(s.highest,5);assert.deepEqual(s.rejected,[]);
});
