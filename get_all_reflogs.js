const { execSync } = require('child_process');
const output = execSync('git log --walk-reflogs --pretty=format:"%h %s"', { encoding: 'utf-8' });
const fs = require('fs');
fs.writeFileSync('all_reflogs.txt', output);
console.log('Done');
