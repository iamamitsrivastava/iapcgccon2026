const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '../public/GUIDELINES.pdf');

const doc = new PDFDocument({
    margin: 50,
    size: 'A4'
});

doc.pipe(fs.createWriteStream(outputPath));

// Header
doc.fontSize(24).font('Helvetica-Bold').text('IAPSMGC CON 2026 Conference', {
    align: 'center'
});
doc.fontSize(14).font('Helvetica').fillColor('grey').text('Submission Guidelines & Author Instructions', {
    align: 'center'
});
doc.moveDown(1.5);

// Intro
doc.fontSize(11).fillColor('black').font('Helvetica').text('All authors are requested to ensure that their submissions are original, unpublished, and not under review elsewhere. Strict plagiarism checks will be conducted.', {
    align: 'left'
});
doc.moveDown(1.5);

const guidelines = [
    {
        title: '1. Abstract Preparation',
        text: 'Authors must prepare an abstract of 250-300 words including 5–6 keywords. The abstract should clearly state the objective, methodology, results, and conclusion. Formatting must follow APA/MLA 9th Edition guidelines.'
    },
    {
        title: '2. Abstract Submission',
        text: 'Submit your abstract through the official IAPSMGC CON 2026 submission portal. Ensure all author details and affiliations are correctly entered. All submissions will undergo a double-blind peer review process.'
    },
    {
        title: '3. Review Process',
        text: 'Each submission will be reviewed by expert reviewers based on originality, technical quality, clarity, and relevance to the conference themes.'
    },
    {
        title: '4. Acceptance Notification',
        text: 'Authors will receive acceptance/rejection notifications via email. Accepted authors must follow further instructions provided in the acceptance letter.'
    },
    {
        title: '5. Full Paper Submission',
        text: 'Accepted authors are required to submit a full-length paper (minimum 7000 words). The paper must follow the official conference template and formatting guidelines.'
    },
    {
        title: '6. Registration',
        text: 'At least one author must complete the registration process to confirm participation. Registration fees must be paid before the deadline.'
    },
    {
        title: '7. Camera-Ready Submission',
        text: 'Submit the final (camera-ready) version of the paper after incorporating reviewer comments. Ensure formatting and plagiarism compliance before final submission.'
    },
    {
        title: '8. Presentation',
        text: 'Authors must present their work during the conference (online/offline as applicable). Failure to present may lead to exclusion from proceedings/publication.'
    }
];

guidelines.forEach(item => {
    doc.fontSize(14).font('Helvetica-Bold').text(item.title);
    doc.moveDown(0.3);
    doc.fontSize(11).font('Helvetica').text(item.text);
    doc.moveDown(1);
});

doc.end();

console.log('Professional PDF generated at ' + outputPath);

