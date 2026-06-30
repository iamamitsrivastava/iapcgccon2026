const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    size: 'A4',
    margin: 0
});

doc.pipe(fs.createWriteStream('public/Eligibility_and_Process_Guidelines.pdf'));

doc.image('public/images/eligibility-process.png', 0, 0, {
    width: 595.28
});

doc.end();
console.log('PDF created successfully.');
