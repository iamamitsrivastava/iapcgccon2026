const fs = require('fs');
const content = fs.readFileSync('lib/registrationData.ts', 'utf-8');

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
hinalbaria150@gmail.com
Bhavin.S.Dave@ril.com
ghanshyamahir@gmail.com
sidhyartha@gmail.com
drharshpsm@gmail.com
bhavikpatel20771@gmail.com`.split('\n').map(e => e.trim());

// Check if any of these already exist in the file, just in case
const existing = [];
emails.forEach(email => {
    if (content.includes(`"${email}"`)) {
        // Find which mapping it's in, we just care if it's in REGISTRATION_MAPPING
        const regMatch = content.match(new RegExp(`"${email}":\\s*\\["26GUJCON\\d+"`));
        if (regMatch) existing.push(email);
    }
});

console.log("Already in REGISTRATION_MAPPING:", existing);

let startNum = 254;
const toAppend = emails.filter(e => !existing.includes(e)).map(e => {
    const code = `26GUJCON${String(startNum).padStart(3, '0')}`;
    startNum++;
    return `  "${e}": ["${code}"]`;
}).join(',\n');

console.log("\nCode to append:\n" + toAppend);
