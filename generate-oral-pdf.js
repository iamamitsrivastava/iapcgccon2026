const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    size: 'A4',
    margin: 0
});

doc.pipe(fs.createWriteStream('public/Oral_Presentation_Guidelines.pdf'));

doc.image('public/images/oral-guidelines.png', 0, 0, {
    width: 595.28
});

doc.end();
console.log('Oral Presentation PDF created successfully.');
