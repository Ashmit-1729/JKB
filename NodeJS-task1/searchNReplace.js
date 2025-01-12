const fs = require('node:fs');
const getContent = fs.readFileSync('hello.txt');
let content = getContent.toString();
content = content.replace(/Hello/g, "Hi");
content = content.replace(/hello/g, "hi");
fs.writeFileSync('hello.txt', content);
