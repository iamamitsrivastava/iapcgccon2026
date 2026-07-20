 
const { Jimp } = require('jimp');
const path = require('path');

async function cropImage() {
    try {
        const imagePath = path.join(process.cwd(), 'public/images/ashok-biswas.png');
        const image = await Jimp.read(imagePath);

        // Autocrop the image to remove the white/beige border
        // We can manually crop if we know the coordinates, but let's try autocrop first
        // Or better, let's just crop it manually to a good headshot ratio.
        // The image is 371 x 537.
        // Let's crop roughly to the center.

        // Alternatively, use Jimp's autocrop
        image.autocrop();

        await image.write(imagePath);
        console.log('Image cropped successfully');
    } catch (error) {
        console.error('Error cropping image:', error);
    }
}

cropImage();
