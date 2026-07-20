 
const { Jimp } = require('jimp');
const path = require('path');

async function cropImage() {
    try {
        const imagePath = path.join(process.cwd(), 'public/images/ashok-biswas.png');
        const image = await Jimp.read(imagePath);

        const width = image.bitmap.width;
        const height = image.bitmap.height;

        // Crop 15% from left and right, 10% from top and bottom
        const cropX = Math.floor(width * 0.15);
        const cropY = Math.floor(height * 0.10);
        const newWidth = width - (2 * cropX);
        const newHeight = height - (2 * cropY);

        image.crop({ x: cropX, y: cropY, w: newWidth, h: newHeight });

        await image.write(imagePath);
        console.log('Image cropped successfully');
    } catch (error) {
        console.error('Error cropping image:', error);
    }
}

cropImage();
