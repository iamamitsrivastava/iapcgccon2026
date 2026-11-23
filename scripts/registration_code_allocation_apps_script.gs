/**
 * ==============================================================================
 * IAPSMGCCON 2026 - Automatic Registration Code Allocation & Persistence Script
 * ==============================================================================
 * 
 * Target Google Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1dUiFyV9YqEajHNBTOUR5-Thvtafs0dTuA2G0axA3VQ0/edit?gid=1602280227#gid=1602280227
 * 
 * SPREADSHEET_ID: 1dUiFyV9YqEajHNBTOUR5-Thvtafs0dTuA2G0axA3VQ0
 * MAPPING_SHEET_GID: 1602280227
 * 
 * Code Allocation Sequence:
 * - Start: 26GUJCON500
 * - End:   26GUJCON800 (Total 301 sequential codes)
 * 
 * Guarantees:
 * 1. Atomic Concurrency Lock via LockService.getScriptLock() (prevents duplicate codes)
 * 2. Idempotency: Returns existing assigned code if participant email already registered
 * 3. Synchronization: Saves allocated code in both the main registration sheet and mapping sheet (gid=1602280227)
 * 4. Exact Mapping Format: emailaddress: ["REGISTRATION_CODE"] (one entry per row)
 * 5. Capacity Check: Halts allocation cleanly if codes through 26GUJCON800 are exhausted
 * ==============================================================================
 */

const CONFIG = {
  SPREADSHEET_ID: "1dUiFyV9YqEajHNBTOUR5-Thvtafs0dTuA2G0axA3VQ0",
  MAPPING_SHEET_GID: 1602280227,
  CODE_PREFIX: "26GUJCON",
  MIN_CODE_NUM: 500,
  MAX_CODE_NUM: 800,
  LOCK_TIMEOUT_MS: 30000 // 30 seconds wait for concurrency
};

/**
 * Handle HTTP GET - Health check and status inquiry
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "IAPSMGCCON 2026 Registration & Code Allocation API is active.",
    range: CONFIG.CODE_PREFIX + CONFIG.MIN_CODE_NUM + " to " + CONFIG.CODE_PREFIX + CONFIG.MAX_CODE_NUM,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle HTTP POST - Atomic Registration Submission & Code Allocation
 */
function doPost(e) {
  // 1. Acquire global script lock to prevent race conditions & duplicate code allocation
  const lock = LockService.getScriptLock();
  try {
    const hasLock = lock.tryLock(CONFIG.LOCK_TIMEOUT_MS);
    if (!hasLock) {
      return createJsonResponse({
        success: false,
        message: "Server is currently handling simultaneous requests. Please retry in a few moments."
      });
    }

    // 2. Parse incoming registration payload
    let data = {};
    try {
      if (e && e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else if (e && e.parameter) {
        data = e.parameter;
      }
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        message: "Invalid JSON payload received: " + parseErr.message
      });
    }

    const email = (data.email || "").toString().trim().toLowerCase();
    if (!email || email.indexOf("@") === -1) {
      return createJsonResponse({
        success: false,
        message: "A valid email address is required for registration and code allocation."
      });
    }

    // 3. Open Spreadsheet & Locate Target Sheets
    const ss = getSpreadsheet();
    if (!ss) {
      return createJsonResponse({
        success: false,
        message: "Unable to access the conference spreadsheet. Verify permissions and spreadsheet ID."
      });
    }

    const mappingSheet = getSheetByGid(ss, CONFIG.MAPPING_SHEET_GID) || ss.getSheetByName("Registration Mapping") || ss.getSheetByName("Mapping");
    if (!mappingSheet) {
      return createJsonResponse({
        success: false,
        message: "Mapping sheet (GID: " + CONFIG.MAPPING_SHEET_GID + ") could not be found in spreadsheet."
      });
    }

    const mainSheet = getMainRegistrationSheet(ss, mappingSheet);

    // 4. Check for Existing Registration / Idempotency Check
    // If this email already has a code allocated, return the existing code immediately.
    const existingCode = findExistingCodeForEmail(mappingSheet, email);
    if (existingCode) {
      return createJsonResponse({
        success: true,
        registrationCode: existingCode,
        isExisting: true,
        message: "Participant already has an assigned registration code."
      });
    }

    // 5. Determine the Next Sequential Code
    const assignedNumbers = getAllAssignedCodeNumbers(mappingSheet, mainSheet);
    let nextNum = CONFIG.MIN_CODE_NUM;

    if (assignedNumbers.length > 0) {
      const maxAssigned = Math.max.apply(null, assignedNumbers);
      nextNum = maxAssigned + 1;
    }

    if (nextNum > CONFIG.MAX_CODE_NUM) {
      return createJsonResponse({
        success: false,
        capacityExhausted: true,
        message: "Registration code capacity has been exhausted. All codes up to " + CONFIG.CODE_PREFIX + CONFIG.MAX_CODE_NUM + " have been allocated."
      });
    }

    const allocatedCode = CONFIG.CODE_PREFIX + nextNum;

    // 6. Record in Mapping Sheet (gid=1602280227)
    // Format: emailaddress: ["REGISTRATION_CODE"]
    const mappingRowEntry = email + ': ["' + allocatedCode + '"]';
    mappingSheet.appendRow([mappingRowEntry]);

    // 7. Record in Main Registration Sheet
    data.registrationCode = allocatedCode;
    data.registrationNumber = allocatedCode; // Overwrite/assign official conference code
    const mainRowIndex = saveToMainSheet(mainSheet, data, allocatedCode);

    // 8. Return Success with Assigned Code
    return createJsonResponse({
      success: true,
      registrationCode: allocatedCode,
      isExisting: false,
      row: mainRowIndex,
      message: "Registration saved and code " + allocatedCode + " allocated successfully."
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      message: "Server error during registration code allocation: " + err.message
    });
  } finally {
    // Release the mutex lock
    lock.releaseLock();
  }
}

/**
 * Access the spreadsheet via ID or Active Spreadsheet
 */
function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  } catch (e) {
    try {
      return SpreadsheetApp.getActiveSpreadsheet();
    } catch (e2) {
      return null;
    }
  }
}

/**
 * Find a specific sheet tab by its numeric GID
 */
function getSheetByGid(spreadsheet, gid) {
  const sheets = spreadsheet.getSheets();
  const targetGid = Number(gid);
  for (let i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === targetGid) {
      return sheets[i];
    }
  }
  return null;
}

/**
 * Locate the primary registration sheet (excluding the mapping sheet)
 */
function getMainRegistrationSheet(spreadsheet, mappingSheet) {
  const sheets = spreadsheet.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() !== mappingSheet.getSheetId()) {
      return sheets[i];
    }
  }
  return sheets[0];
}

/**
 * Scan mapping sheet for existing email-to-code allocation
 * Format in sheet: email: ["26GUJCON500"]
 */
function findExistingCodeForEmail(mappingSheet, email) {
  const lastRow = mappingSheet.getLastRow();
  if (lastRow < 1) return null;

  const values = mappingSheet.getRange(1, 1, lastRow, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    const rawText = String(values[i][0] || "").trim();
    if (!rawText) continue;

    const colonIndex = rawText.indexOf(":");
    if (colonIndex !== -1) {
      const entryEmail = rawText.substring(0, colonIndex).replace(/['"\s]/g, "").toLowerCase();
      if (entryEmail === email) {
        const match = rawText.match(/26GUJCON\d+/i);
        if (match) {
          return match[0].toUpperCase();
        }
      }
    }
  }
  return null;
}

/**
 * Scan mapping sheet (and main sheet) to find all assigned code numbers in range 500..800
 */
function getAllAssignedCodeNumbers(mappingSheet, mainSheet) {
  const numbers = [];
  const regex = /26GUJCON(\d+)/i;

  // Scan mapping sheet
  const lastRow = mappingSheet.getLastRow();
  if (lastRow > 0) {
    const values = mappingSheet.getRange(1, 1, lastRow, 1).getValues();
    for (let i = 0; i < values.length; i++) {
      const str = String(values[i][0] || "");
      const match = str.match(regex);
      if (match) {
        const n = parseInt(match[1], 10);
        if (!isNaN(n) && n >= CONFIG.MIN_CODE_NUM && n <= CONFIG.MAX_CODE_NUM) {
          if (numbers.indexOf(n) === -1) {
            numbers.push(n);
          }
        }
      }
    }
  }

  // Scan main sheet registrationNumber column if present
  if (mainSheet && mainSheet.getLastRow() > 1) {
    try {
      const headerRow = mainSheet.getRange(1, 1, 1, mainSheet.getLastColumn()).getValues()[0];
      let codeColIndex = -1;
      for (let c = 0; c < headerRow.length; c++) {
        const h = String(headerRow[c] || "").toLowerCase();
        if (h.indexOf("code") !== -1 || h.indexOf("registration") !== -1 || h.indexOf("reg no") !== -1) {
          codeColIndex = c + 1;
          break;
        }
      }

      if (codeColIndex !== -1) {
        const mainValues = mainSheet.getRange(2, codeColIndex, mainSheet.getLastRow() - 1, 1).getValues();
        for (let j = 0; j < mainValues.length; j++) {
          const val = String(mainValues[j][0] || "");
          const match = val.match(regex);
          if (match) {
            const n = parseInt(match[1], 10);
            if (!isNaN(n) && n >= CONFIG.MIN_CODE_NUM && n <= CONFIG.MAX_CODE_NUM) {
              if (numbers.indexOf(n) === -1) {
                numbers.push(n);
              }
            }
          }
        }
      }
    } catch (e) {
      // Non-critical: mapping sheet remains primary source of truth
    }
  }

  numbers.sort(function(a, b) { return a - b; });
  return numbers;
}

/**
 * Append or map registration row into the main registration sheet
 */
function saveToMainSheet(mainSheet, data, allocatedCode) {
  const lastCol = mainSheet.getLastColumn();
  
  if (lastCol > 0 && mainSheet.getLastRow() > 0) {
    const headers = mainSheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const newRow = new Array(headers.length);

    for (let c = 0; c < headers.length; c++) {
      const header = String(headers[c] || "").trim().toLowerCase();
      
      if (header.indexOf("timestamp") !== -1 || header.indexOf("date") !== -1 && header.indexOf("payment") === -1) {
        newRow[c] = new Date();
      } else if (header.indexOf("code") !== -1 || (header.indexOf("registration") !== -1 && (header.indexOf("no") !== -1 || header.indexOf("num") !== -1))) {
        newRow[c] = allocatedCode;
      } else if (header.indexOf("name") !== -1) {
        newRow[c] = data.fullName || "";
      } else if (header.indexOf("email") !== -1) {
        newRow[c] = data.email || "";
      } else if (header.indexOf("phone") !== -1 || header.indexOf("mobile") !== -1) {
        newRow[c] = data.phone || data.mobile || "";
      } else if (header.indexOf("gender") !== -1) {
        newRow[c] = data.gender || "";
      } else if (header.indexOf("department") !== -1) {
        newRow[c] = data.department || "";
      } else if (header.indexOf("designation") !== -1) {
        newRow[c] = data.designation || "";
      } else if (header.indexOf("institution") !== -1 || header.indexOf("college") !== -1) {
        newRow[c] = data.institution || "";
      } else if (header.indexOf("category") !== -1) {
        newRow[c] = data.category || data.participantCategory || "";
      } else if (header.indexOf("member") !== -1 && header.indexOf("iapsm") !== -1) {
        newRow[c] = data.iapsmMembership || data.iapsmMember || "";
      } else if (header.indexOf("amount") !== -1 || header.indexOf("fee") !== -1) {
        newRow[c] = data.amount || "";
      } else if (header.indexOf("plan") !== -1) {
        newRow[c] = data.registrationPlan || "";
      } else if (header.indexOf("rrn") !== -1 || header.indexOf("transaction") !== -1) {
        newRow[c] = data.rrn || "";
      } else if (header.indexOf("photo") !== -1) {
        newRow[c] = data.passportPhoto || "";
      } else if (header.indexOf("payment proof") !== -1 || header.indexOf("proof") !== -1) {
        newRow[c] = data.paymentProof || "";
      } else if (header.indexOf("food") !== -1) {
        newRow[c] = data.foodPreference || "";
      } else {
        newRow[c] = data[headers[c]] || "";
      }
    }

    mainSheet.appendRow(newRow);
    return mainSheet.getLastRow();
  }

  // Fallback: standard row append
  mainSheet.appendRow([
    new Date(),
    allocatedCode,
    data.fullName || "",
    data.email || "",
    data.phone || data.mobile || "",
    data.institution || "",
    data.category || "",
    data.registrationPlan || "",
    data.amount || "",
    data.rrn || "",
    data.paymentProof || "",
    data.passportPhoto || ""
  ]);
  return mainSheet.getLastRow();
}

/**
 * Standardized JSON HTTP Response Output
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
