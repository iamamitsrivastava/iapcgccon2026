 
const { Jimp } = require('jimp');
const path = require('path');

async function cropImage() {
    try {
        const inputPath = path.join(process.cwd(), 'public/images/digvijay-pandya-raw.jpg');
        const outputPath = path.join(process.cwd(), 'public/images/digvijay-pandya.jpg');
        const image = await Jimp.read(inputPath);

        // Current size: 896 x 1024
        // We want a more tightly cropped headshot.
        // Let's target the upper part, roughly from y=100 to y=800? 
        // Actually, let's just do a 1:1.2 crop around the face.

        const width = image.bitmap.width; // 896
        const height = image.bitmap.height; // 1024

        // Target: 800x914 (3.5:4 ratio)
        const targetWidth = 800;
        const targetHeight = Math.floor(targetWidth / 0.875); // 914

        const x = Math.floor((width - targetWidth) / 2);
        const y = 0; // Start from top

        image.crop({ x, y, w: targetWidth, h: targetHeight });

        await image.write(outputPath);
        console.log('Image cropped successfully to ' + outputPath);
    } catch (error) {
        console.error('Error cropping image:', error);
    }
}

cropImage();
