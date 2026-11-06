const assert = require('node:assert/strict');
const { getSignIndex } = require('../horoscupo/zodiac');
const boundaries = [
 ['janeiro',19,9,20,10], ['fevereiro',18,10,19,11], ['marco',20,11,21,0],
 ['abril',19,0,20,1], ['maio',20,1,21,2], ['junho',20,2,21,3],
 ['julho',22,3,23,4], ['agosto',22,4,23,5], ['setembro',22,5,23,6],
 ['outubro',22,6,23,7], ['novembro',21,7,22,8], ['dezembro',21,8,22,9],
];
let count = 0;
for (const [month, before, expectedBefore, after, expectedAfter] of boundaries) {
 assert.equal(getSignIndex(before,month),expectedBefore); count++;
 assert.equal(getSignIndex(String(after),month),expectedAfter); count++;
}
for (const [day,month] of [[0,'abril'],[31,'abril'],[31,'junho'],[31,'setembro'],[31,'novembro'],[30,'fevereiro'],[-1,'maio'],[1.5,'maio'],['','maio'],['null','maio'],['abc','maio'],[1,''],[1,'__proto__'],[32,'janeiro']]) {
 assert.equal(getSignIndex(day,month),null); count++;
}
assert.equal(getSignIndex(29,'fevereiro'),11);count++;
console.log(`${count} verificações de datas aprovadas; fevereiro aceita 29 pois o app não solicita ano.`);
