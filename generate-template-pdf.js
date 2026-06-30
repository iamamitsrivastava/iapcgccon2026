const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    size: 'A4',
    margin: 0
});

doc.pipe(fs.createWriteStream('public/Template_for_Abstract_Submission.pdf'));

doc.image('public/images/abstract-template.png', 0, 0, {
    width: 595.28
});

doc.end();
console.log('Template PDF created successfully.');
