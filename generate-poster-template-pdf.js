const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    size: 'A4',
    margin: 0
});

doc.pipe(fs.createWriteStream('public/Poster_Presentation_Template.pdf'));

doc.image('public/images/poster-template.png', 0, 0, {
    width: 595.28
});

doc.end();
console.log('Poster Template PDF created successfully.');
