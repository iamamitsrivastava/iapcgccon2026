const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgAzVPYjO9_07PbNY5-jNPcrxVnTdnkUwlmvjoReuvVmZoCia9kVfiEpAB8yUMvLe0/exec";

export async function submitRegistration(data: any) {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(data),
  });

  // Google Scripts often return a redirect or text instead of strict JSON, 
  // so we read it as text to prevent JSON parsing errors.
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
