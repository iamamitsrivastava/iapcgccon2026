 
const Jimp = require('jimp');

async function padImage(filePath) {
    const image = await Jimp.read(filePath);
    const width = image.getWidth();
    const height = image.getHeight();

    // Create a new image with 10% more height at the top, filled with transparent or white
    // wait we can use the background color of the top row
    const bgColor = image.getPixelColor(width / 2, 0);

    const newHeight = Math.floor(height * 1.15);
    const newImage = new Jimp(width, newHeight, bgColor);

    // Composite original image onto new image, shifted down
    newImage.composite(image, 0, newHeight - height);

    await newImage.writeAsync(filePath);
    console.log(`Padded ${filePath}`);
}

padImage('/Users/amitsrivastava/Desktop/IAPSMGC CON 2026/public/images/krishan-kumar-soni.jpg').catch(console.error);
padImage('/Users/amitsrivastava/Desktop/IAPSMGC CON 2026/public/images/krishna-mishra.jpg').catch(console.error);
