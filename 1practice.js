const fs =require('fs');
const fileName = '1practice.txt';
const writefile=fs.writeFileSync(fileName, 'Hello World!','utf8');
console.log(fileName);
