const fs = require('fs');
const content = fs.readFileSync('lib/registrationData.ts', 'utf-8');
const mappingMatch = content.match(/export const ACCESS_CODE_MAPPING: Record<string, string\[\]> = \{([\s\S]*?)\};/);
if (mappingMatch) {
  const mappingStr = mappingMatch[1];
  const regex = /"([^"]+)":/g;
  let match;
  const seen = new Set();
  const dupes = [];
  while ((match = regex.exec(mappingStr)) !== null) {
    if (seen.has(match[1])) {
      dupes.push(match[1]);
    }
    seen.add(match[1]);
  }
  console.log("Duplicates in ACCESS_CODE_MAPPING:", dupes);
}
