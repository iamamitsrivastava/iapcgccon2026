const fs = require('fs');

const fileContent = fs.readFileSync('lib/registrationData.ts', 'utf-8');
const usedCodes = new Set();
const mappingMatch = fileContent.match(/export const ACCESS_CODE_MAPPING: Record<string, string\[\]> = \{([\s\S]*?)\};/);
if (mappingMatch) {
  const mappingStr = mappingMatch[1];
  const regex = /:\s*\[\s*"([^"]+)"(?:\s*,\s*"([^"]+)")*\s*\]/g;
  let match;
  while ((match = regex.exec(mappingStr)) !== null) {
    usedCodes.add(match[1]);
    if (match[2]) usedCodes.add(match[2]);
  }
}
// wait, easier to just regex for "IAPSMGC-[A-Z0-9]+"
const allCodesRegex = /"IAPSMGC-[A-Z0-9]+"/g;
let cMatch;
while ((cMatch = allCodesRegex.exec(fileContent)) !== null) {
  usedCodes.add(cMatch[0].replace(/"/g, ''));
}

const emails = `kp12sept@gmail.com
harshilpatel11192@gmail.com
maharshivp84@yahoo.co.in
snehalvasaiya98@gmail.com
ddhameliya16@gmail.com
suraniurvashi0@gmail.com
mjmesuriya@gmail.com
nandhakumar4005@gmail.com
drdineshkl@bhaikakauniv.edu.in
ankurvchaudhari@gmail.com
draparajita73@hotmail.com
khyatiahir1699@gmail.com
rkmakhesana721999@gmail.com
hinalbaria150@gmail.com
Bhavin.S.Dave@ril.com
ghanshyamahir@gmail.com
sidhyartha@gmail.com
drharshpsm@gmail.com
bhavikpatel20771@gmail.com`.split('\n').map(e => e.trim());

const codes = `IAPSMGC-Y1K4M9
IAPSMGC-D8P2T6
IAPSMGC-M7Q5L1
IAPSMGC-B2X9W4
IAPSMGC-U8R1K3
IAPSMGC-C6T4N9
IAPSMGC-G1P7Q2
IAPSMGC-L8W3M6
IAPSMGC-P5K9X1
IAPSMGC-R7N2T8
IAPSMGC-X4Q6L5
IAPSMGC-V9M1P7
IAPSMGC-H3W8K2
IAPSMGC-Z2R5X6
IAPSMGC-E9L4N1
IAPSMGC-T7P3M8
IAPSMGC-A5Q1W9
IAPSMGC-F8K6R4
IAPSMGC-K3W8N5
IAPSMGC-P9R2X6
IAPSMGC-Z4M7T1
IAPSMGC-V6Q1L8
IAPSMGC-E5K9P3
IAPSMGC-R8N4W2
IAPSMGC-X2T7M9
IAPSMGC-H1P6Q4
IAPSMGC-Q8L3R7
IAPSMGC-T5X9K2
IAPSMGC-A7M4N8
IAPSMGC-F1W6P5
IAPSMGC-Y3Q8T9
IAPSMGC-D9L2X1
IAPSMGC-M4R7K6
IAPSMGC-B8P5W1
IAPSMGC-U6N9Q3
IAPSMGC-C2X4T7
IAPSMGC-G5M1L9
IAPSMGC-L7K3R8
IAPSMGC-P1Q6N4
IAPSMGC-R4T8W9
IAPSMGC-X9M2P7
IAPSMGC-V3L5K1
IAPSMGC-H6R8Q2
IAPSMGC-Z1W4T5
IAPSMGC-E8P7M3
IAPSMGC-T3N1X9
IAPSMGC-A4Q6L7
IAPSMGC-F9K5R2
IAPSMGC-Y6T1W8
IAPSMGC-D2M9P4
IAPSMGC-M8X3Q5
IAPSMGC-B7L1N6
IAPSMGC-U4R2K9
IAPSMGC-C5P8T3
IAPSMGC-G9W6M1
IAPSMGC-L2Q7X4
IAPSMGC-P8N5R9
IAPSMGC-R6K1L3
IAPSMGC-X5T2W7
IAPSMGC-V1M8Q6
IAPSMGC-H7P9N2
IAPSMGC-Z3R4K5
IAPSMGC-E6X1T8
IAPSMGC-T8L9M4
IAPSMGC-A1W5Q7
IAPSMGC-F4N2P8
IAPSMGC-Y7K6R3
IAPSMGC-D5T8X9
IAPSMGC-M1Q4W6
IAPSMGC-B3P7L2
IAPSMGC-U9R5N1
IAPSMGC-C8M6K4
IAPSMGC-G2X9T5
IAPSMGC-L6W1P3
IAPSMGC-P4Q8R2
IAPSMGC-R3N7M5
IAPSMGC-X7K4L9
IAPSMGC-V8T2Q1
IAPSMGC-H5M3W7
IAPSMGC-Z9P6X2
IAPSMGC-E1R8N4
IAPSMGC-T6Q5K9
IAPSMGC-A9L7M3
IAPSMGC-F2W8R1
IAPSMGC-Y5P3T6
IAPSMGC-D7X4Q8
IAPSMGC-M6N2L5
IAPSMGC-B1K9W7
IAPSMGC-U3T5P2
IAPSMGC-C4R1X8
IAPSMGC-G8Q7M6
IAPSMGC-L1P9N3
IAPSMGC-P2W4K8
IAPSMGC-R5M6T1
IAPSMGC-X3Q9L7
IAPSMGC-V7R1P4
IAPSMGC-H4N8W5
IAPSMGC-Z6T3K2
IAPSMGC-E3M5Q1
IAPSMGC-T1X7R9
IAPSMGC-A2P6L4
IAPSMGC-F5Q3N8
IAPSMGC-Y8W2M1
IAPSMGC-D4K7T6
IAPSMGC-M9R1X5
IAPSMGC-B6L8Q3
IAPSMGC-U5P4W9
IAPSMGC-C3N1K7
IAPSMGC-G7T9R4
IAPSMGC-L9M5X2
IAPSMGC-P6Q1W3
IAPSMGC-R2K8N7
IAPSMGC-X1L4T9
IAPSMGC-V5M7P6
IAPSMGC-H2Q9R1
IAPSMGC-Z8W5L4
IAPSMGC-E4T2N7
IAPSMGC-T9P1K3
IAPSMGC-A3X8M6
IAPSMGC-F6R4Q9`.split('\n').map(c => c.trim());

const availableCodes = codes.filter(c => !usedCodes.has(c));
console.log('Available codes:', availableCodes.length);

const assignments = [];
for (let i = 0; i < emails.length; i++) {
  assignments.push({ email: emails[i], code: availableCodes[i] });
}

console.log('| Email | Assigned Code |');
console.log('|---|---|');
assignments.forEach(a => console.log(`| ${a.email} | ${a.code} |`));

const extraLines = assignments.map(a => `  "${a.email}": ["${a.code}"]`).join(',\n');
console.log('\nCode to append:\n' + extraLines);

