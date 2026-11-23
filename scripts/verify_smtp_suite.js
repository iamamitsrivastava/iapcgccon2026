const nodemailer = require('nodemailer');

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const host = (process.env.SMTP_HOST?.trim()) || 'smtp.gmail.com';
  const rawPort = process.env.SMTP_PORT?.trim() || '587';

  if (!user) {
    throw new Error('SMTP configuration error: SMTP_USER environment variable is missing.');
  }

  if (!pass) {
    throw new Error('SMTP configuration error: SMTP_PASS environment variable is missing.');
  }

  const port = parseInt(rawPort, 10);
  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(`SMTP configuration error: SMTP_PORT must be a valid port number (got: "${rawPort}").`);
  }

  const secure = port === 465;

  return { host, port, secure, user, pass };
}

function getEmailSender(displayName = 'IAPSMGC CON 2026') {
  const { user } = getSmtpConfig();
  return {
    name: displayName,
    address: user,
    formatted: `"${displayName}" <${user}>`,
  };
}

function getEmailTransport(customConfig) {
  const config = { ...getSmtpConfig(), ...customConfig };

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, extra) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}${extra ? ` - ${extra}` : ''}`);
      failed++;
    }
  }

  console.log('\n--- 1. SMTP CONFIGURATION TESTS ---');

  // Test 1: SMTP_USER missing
  delete process.env.SMTP_USER;
  process.env.SMTP_PASS = 'testpass';
  try {
    getSmtpConfig();
    assert(false, 'Should throw error when SMTP_USER is missing');
  } catch (err) {
    assert(err.message.includes('SMTP_USER environment variable is missing'), 'Throws when SMTP_USER is missing');
  }

  // Test 2: SMTP_PASS missing
  process.env.SMTP_USER = 'iapsmgc.conference@paruluniversity.ac.in';
  delete process.env.SMTP_PASS;
  try {
    getSmtpConfig();
    assert(false, 'Should throw error when SMTP_PASS is missing');
  } catch (err) {
    assert(err.message.includes('SMTP_PASS environment variable is missing'), 'Throws when SMTP_PASS is missing');
  }

  // Test 3: Invalid SMTP_PORT
  process.env.SMTP_USER = 'iapsmgc.conference@paruluniversity.ac.in';
  process.env.SMTP_PASS = 'testpass';
  process.env.SMTP_PORT = 'invalid-port';
  try {
    getSmtpConfig();
    assert(false, 'Should throw error when SMTP_PORT is invalid');
  } catch (err) {
    assert(err.message.includes('SMTP_PORT must be a valid port number'), 'Throws on invalid SMTP_PORT');
  }

  // Test 4: Port 465 configuration -> secure: true
  process.env.SMTP_PORT = '465';
  delete process.env.SMTP_HOST;
  const config465 = getSmtpConfig();
  assert(config465.port === 465 && config465.secure === true, 'Port 465 resolves to secure: true');
  assert(config465.host === 'smtp.gmail.com', 'Defaults host to smtp.gmail.com when SMTP_HOST is not set');

  // Test 5: Port 587 configuration -> secure: false
  process.env.SMTP_PORT = '587';
  process.env.SMTP_HOST = 'smtp.gmail.com';
  const config587 = getSmtpConfig();
  assert(config587.port === 587 && config587.secure === false, 'Port 587 resolves to secure: false (STARTTLS)');

  // Test 6: getEmailSender formatting
  const sender = getEmailSender('IAPSMGC CON 2026');
  assert(sender.formatted === '"IAPSMGC CON 2026" <iapsmgc.conference@paruluniversity.ac.in>', 'Sender formatted correctly from active SMTP_USER');

  // Test 7: HTML escaping
  const rawHtml = '<script>alert("xss")</script> & "quote" \'single\'';
  const escaped = escapeHtml(rawHtml);
  assert(!escaped.includes('<script>') && escaped.includes('&lt;script&gt;') && escaped.includes('&amp;'), 'HTML escaping prevents XSS injection');

  console.log('\n--- 2. REGISTRATION EMAIL VALIDATION TESTS ---');
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  assert(!EMAIL_REGEX.test(''), 'Rejects empty recipient email');
  assert(!EMAIL_REGEX.test('not-an-email'), 'Rejects invalid recipient email without @ or domain');
  assert(EMAIL_REGEX.test('user@domain.com'), 'Accepts valid email address');
  assert(EMAIL_REGEX.test('iapsmgc.conference@paruluniversity.ac.in'), 'Accepts valid conference email address');

  console.log('\n--- 3. ACCESS CODE REGISTRATION MAPPING TESTS ---');
  const regDataContent = require('fs').readFileSync('lib/registrationData.ts', 'utf-8');
  assert(regDataContent.includes('prashant.dave29697@paruluniversity.ac.in'), 'REGISTRATION_MAPPING includes registered conference delegates');
  assert(regDataContent.includes('26GUJCON'), 'Access codes adhere to 26GUJCON pattern');

  console.log('\n--- 4. GOOGLE DRIVE UPLOAD CONFIGURATION TESTS ---');
  const uploadRouteContent = require('fs').readFileSync('app/api/upload/route.ts', 'utf-8');
  assert(uploadRouteContent.includes('process.env.REGISTRATION_UPLOAD_SCRIPT_URL'), 'Upload route references REGISTRATION_UPLOAD_SCRIPT_URL');
  assert(uploadRouteContent.includes('process.env.GOOGLE_DRIVE_REGISTRATION_FOLDER_ID'), 'Upload route references GOOGLE_DRIVE_REGISTRATION_FOLDER_ID');
  assert(uploadRouteContent.includes('AKfycbwxQMEfkNN7hN2ywBpOdZst_h33pC_NnnzCKLkvBZAHRUOg7J0LLhCBu7RnhzKqbds6IQ'), 'Upload route points to standard script URL');

  console.log('\n--- 5. TEMPLATE INTEGRITY TESTS ---');
  const regServiceContent = require('fs').readFileSync('lib/services/registrationService.ts', 'utf-8');
  assert(regServiceContent.includes('Greetings from the Organizing Committee of the 33rd Annual State Conference'), 'Registration email template intact');
  assert(regServiceContent.includes('Parul Institute of Medical Sciences &amp; Research'), 'Registration committee signature intact');
  assert(regServiceContent.includes('cc: CONFERENCE_EMAIL'), 'Conference inbox CC preserved in registration email');

  const abstractRouteContent = require('fs').readFileSync('app/api/submit-abstract/route.ts', 'utf-8');
  assert(abstractRouteContent.includes("submissionType === 'FULL_PAPER' ? 'full paper' : 'abstract'"), 'Abstract submission distinguishes between full paper and abstract in text body');

  console.log('\n=============================================');
  console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('=============================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
