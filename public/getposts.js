const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../content/posts');
let postList = [];

const getPosts = async () => {
    await fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.error(err);
        }
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const post = {
                title: file.replace('.md', ''),
            }
        })
    }
}
