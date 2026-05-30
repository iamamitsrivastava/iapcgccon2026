const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');
const srcDirs = [path.join(__dirname, 'components'), path.join(__dirname, 'app'), path.join(__dirname, 'data')];

let availableImages = new Set();
if (fs.existsSync(publicImagesDir)) {
    availableImages = new Set(fs.readdirSync(publicImagesDir));
}

let missingImages = new Set();

function searchDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            searchDir(fullPath);
        } else if (fullPath.match(/\.(tsx|ts|js|css)$/)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const matches = content.match(/\/images\/([^"'\s\\)]+)/g);
            if (matches) {
                for (const match of matches) {
                    const imageName = match.replace('/images/', '').split('?')[0]; // Strip query params if any
                    if (!availableImages.has(imageName)) {
                        missingImages.add(`${imageName} (in ${fullPath.replace(__dirname, '')})`);
                    }
                }
            }
        }
    }
}

srcDirs.forEach(searchDir);

if (missingImages.size === 0) {
    console.log("No missing images found.");
} else {
    console.log("Missing images:");
    missingImages.forEach(img => console.log(img));
}
