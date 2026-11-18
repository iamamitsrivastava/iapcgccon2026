/**
 * Google Apps Script for IAPSMGCCON 2026 - Registration Photograph Upload
 * 
 * Deployment Instructions:
 * 1. Open Google Apps Script (https://script.google.com) or open your Google Sheet > Extensions > Apps Script.
 * 2. Paste this code into Code.gs (or add the upload block to your existing doPost function).
 * 3. Click "Deploy" > "Manage deployments" > Edit (pencil icon) > choose "New version" > click "Deploy".
 *    (Or click "New deployment" > type: Web app).
 * 4. Configuration:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. If using a new URL, set REGISTRATION_UPLOAD_SCRIPT_URL in .env.local or update in app/api/upload/route.ts.
 */

function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : null;
    if (!contents) {
      return jsonResponse({ success: false, error: "Empty request body" });
    }

    var data = JSON.parse(contents);

    // Support both "uploadPhoto" and "uploadOnly"
    if (data.action === "uploadPhoto" || data.action === "uploadOnly" || data.fileBase64) {
      var folderId = data.folderId || "1pLL29U8Pcd61VtU7E0c6I9xNK64BzvIW";
      var folder = DriveApp.getFolderById(folderId);

      var mimeType = data.fileMimeType || "image/jpeg";
      var fileName = data.fileName || "registration-photo.jpg";
      var decodedBytes = Utilities.base64Decode(data.fileBase64);
      var blob = Utilities.newBlob(decodedBytes, mimeType, fileName);

      var file = folder.createFile(blob);
      
      // Allow viewing with link for conference review
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (permErr) {
        // Continue if domain policy restricts public link sharing
      }

      var driveUrl = file.getUrl();

      return jsonResponse({
        success: true,
        status: "success",
        url: driveUrl,
        driveUrl: driveUrl,
        fileName: file.getName(),
        fileId: file.getId()
      });
    }

    return jsonResponse({ success: false, error: "Invalid action or missing fileBase64" });

  } catch (err) {
    return jsonResponse({
      success: false,
      status: "error",
      message: err.toString()
    });
  }
}

function doGet(e) {
  return ContentService.createTextOutput("IAPSMGCCON 2026 Registration Photo Upload Service Active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
