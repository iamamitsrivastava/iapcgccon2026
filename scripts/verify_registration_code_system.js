const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('===============================================================');
console.log('IAPSMGCCON 2026 - Automatic Code Allocation System Verification');
console.log('===============================================================\n');

let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✅ [PASS] ${description}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${description}:`, err.message);
    failed++;
  }
}

// 1. Verify Google Apps Script file integrity
const appsScriptContent = fs.readFileSync(path.join(__dirname, 'registration_code_allocation_apps_script.gs'), 'utf8');

test('Apps Script has correct Target Spreadsheet ID', () => {
  assert(appsScriptContent.includes('1dUiFyV9YqEajHNBTOUR5-Thvtafs0dTuA2G0axA3VQ0'));
});

test('Apps Script targets separate Mapping Sheet GID 1602280227', () => {
  assert(appsScriptContent.includes('MAPPING_SHEET_GID: 1602280227'));
});

test('Apps Script sequence starts at 26GUJCON500 and ends at 26GUJCON800', () => {
  assert(appsScriptContent.includes('CODE_PREFIX: "26GUJCON"'));
  assert(appsScriptContent.includes('MIN_CODE_NUM: 500'));
  assert(appsScriptContent.includes('MAX_CODE_NUM: 800'));
});

test('Apps Script enforces atomic Concurrency Lock with LockService', () => {
  assert(appsScriptContent.includes('LockService.getScriptLock()'));
  assert(appsScriptContent.includes('lock.releaseLock()'));
});

test('Apps Script implements Idempotency check for existing email codes', () => {
  assert(appsScriptContent.includes('findExistingCodeForEmail'));
  assert(appsScriptContent.includes('isExisting: true'));
});

test('Apps Script writes exact format: emailaddress: ["REGISTRATION_CODE"]', () => {
  assert(appsScriptContent.includes('email + \': ["\' + allocatedCode + \'"]\''));
});

test('Apps Script halts when capacity through 26GUJCON800 is exhausted', () => {
  assert(appsScriptContent.includes('nextNum > CONFIG.MAX_CODE_NUM'));
  assert(appsScriptContent.includes('capacityExhausted: true'));
});

test('Apps Script saves assigned code to both main sheet and mapping sheet', () => {
  assert(appsScriptContent.includes('mappingSheet.appendRow([mappingRowEntry])'));
  assert(appsScriptContent.includes('saveToMainSheet(mainSheet, data, allocatedCode)'));
});

// 2. Verify Next.js Backend Integration
const googleSheetContent = fs.readFileSync(path.join(__dirname, '../lib/googleSheet.ts'), 'utf8');

test('submitRegistration captures registrationCode from server response', () => {
  assert(googleSheetContent.includes('sheetResult.registrationCode'));
  assert(googleSheetContent.includes('allocatedCode = sheetResult.registrationCode'));
});

test('submitRegistration passes assigned code to sendRegistrationMail', () => {
  assert(googleSheetContent.includes('registrationCode: allocatedCode || undefined'));
});

test('submitRegistration handles capacityExhausted signal', () => {
  assert(googleSheetContent.includes('capacityExhausted: !!sheetResult.capacityExhausted'));
});

// 3. Verify Email Template Updates
const regServiceContent = fs.readFileSync(path.join(__dirname, '../lib/services/registrationService.ts'), 'utf8');

test('Email template includes Your Registration Code when code is present', () => {
  assert(regServiceContent.includes('Your Registration Code:'));
  assert(regServiceContent.includes('Please keep this code safe. You may need it for future communication and conference-related activities.'));
});

test('Email sender display name is IAPSMGCCON 2026', () => {
  assert(regServiceContent.includes("getEmailSender('IAPSMGCCON 2026')"));
});

test('Email sender address uses official conference inbox', () => {
  assert(regServiceContent.includes("CONFERENCE_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in'"));
});

// 4. Verify Frontend Popup & Success Screen
const frontendContent = fs.readFileSync(path.join(__dirname, '../app/registration/form/page.tsx'), 'utf8');

test('Frontend displays Registration Successful! heading', () => {
  assert(frontendContent.includes('Registration Successful!'));
});

test('Frontend prominently displays assigned registration code', () => {
  assert(frontendContent.includes('Your Registration Code'));
  assert(frontendContent.includes('{assignedRegistrationCode}'));
});

test('Frontend provides 1-click Copy Code functionality', () => {
  assert(frontendContent.includes('copyToClipboard(assignedRegistrationCode, setCodeCopied)'));
  assert(frontendContent.includes('Copied to Clipboard!'));
});

// 5. Simulation of Code Allocation Logic
function simulateAllocation(existingMappings, newEmail) {
  const normEmail = newEmail.trim().toLowerCase();
  
  // Idempotency check
  for (const entry of existingMappings) {
    const colonIdx = entry.indexOf(':');
    if (colonIdx !== -1) {
      const e = entry.substring(0, colonIdx).replace(/['"\s]/g, '').toLowerCase();
      if (e === normEmail) {
        const match = entry.match(/26GUJCON\d+/i);
        if (match) return { code: match[0].toUpperCase(), isExisting: true };
      }
    }
  }

  // Scan assigned numbers
  const nums = [];
  for (const entry of existingMappings) {
    const match = entry.match(/26GUJCON(\d+)/i);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n >= 500 && n <= 800) nums.push(n);
    }
  }

  let next = 500;
  if (nums.length > 0) {
    next = Math.max(...nums) + 1;
  }

  if (next > 800) {
    return { error: 'capacityExhausted' };
  }

  const newCode = `26GUJCON${next}`;
  const newEntry = `${normEmail}: ["${newCode}"]`;
  existingMappings.push(newEntry);
  return { code: newCode, isExisting: false, entry: newEntry };
}

test('Simulation: starts at 26GUJCON500 on clean state', () => {
  const list = [];
  const res = simulateAllocation(list, 'sochaliya@gmail.com');
  assert.strictEqual(res.code, '26GUJCON500');
  assert.strictEqual(res.isExisting, false);
  assert.strictEqual(res.entry, 'sochaliya@gmail.com: ["26GUJCON500"]');
});

test('Simulation: increments sequentially to 26GUJCON501 and 26GUJCON502', () => {
  const list = ['sochaliya@gmail.com: ["26GUJCON500"]'];
  const res1 = simulateAllocation(list, 'participant1@gmail.com');
  assert.strictEqual(res1.code, '26GUJCON501');
  const res2 = simulateAllocation(list, 'participant2@gmail.com');
  assert.strictEqual(res2.code, '26GUJCON502');
});

test('Simulation: idempotency returns previously assigned code without duplicate', () => {
  const list = ['sochaliya@gmail.com: ["26GUJCON500"]'];
  const initialLen = list.length;
  const retryRes = simulateAllocation(list, 'sochaliya@gmail.com');
  assert.strictEqual(retryRes.code, '26GUJCON500');
  assert.strictEqual(retryRes.isExisting, true);
  assert.strictEqual(list.length, initialLen, 'List length must remain unchanged on retry');
});

test('Simulation: stops cleanly when 26GUJCON800 is exhausted', () => {
  const list = ['delegate@gmail.com: ["26GUJCON800"]'];
  const res = simulateAllocation(list, 'latecomer@gmail.com');
  assert.strictEqual(res.error, 'capacityExhausted');
});

console.log('\n===============================================================');
console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('===============================================================\n');

if (failed > 0) process.exit(1);
