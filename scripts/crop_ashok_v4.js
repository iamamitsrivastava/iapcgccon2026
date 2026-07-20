 
const { Jimp } = require('jimp');
const path = require('path');

async function cropImage() {
    try {
        const inputPath = path.join(process.cwd(), 'public/images/ashok-biswas.png');
        const outputPath = path.join(process.cwd(), 'public/images/ashok-biswas-new.png');
        const image = await Jimp.read(inputPath);

        // We want a headshot.
        // Let's assume the face is roughly in the top-center.
        // Currently the image is heavily cropped already.

        // Let's just take a 300x360 (1:1.2 ratio) crop from the center-top.
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        // Target ratio is 1/1.2 (0.83)
        // Let's try to find a crop that is 0.83 ratio.
        let targetWidth = width;
        let targetHeight = Math.floor(width / 0.833);

        if (targetHeight > height) {
            targetHeight = height;
            targetWidth = Math.floor(height * 0.833);
        }

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
