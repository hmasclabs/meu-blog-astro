const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/authors.json', 'utf8'));
for (let a of data) {
    if (a.avatar && a.avatar.startsWith('data:image')) {
        const base64 = a.avatar.split(',')[1];
        const ext = a.avatar.split(';')[0].split('/')[1] || 'png';
        const path = 'public/uploads/avatar-' + a.id + '.' + ext;
        fs.writeFileSync(path, Buffer.from(base64, 'base64'));
        a.avatar = path.replace('public', '');
    }
}
fs.writeFileSync('src/data/authors.json', JSON.stringify(data, null, 2));
console.log('Done!');
