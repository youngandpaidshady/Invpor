const { execSync } = require('child_process');
const output = execSync('git log -g --pretty=format:"%h %s"', { encoding: 'utf-8' });
const fs = require('fs');
fs.writeFileSync('reflog.txt', output);
console.log('Done');
