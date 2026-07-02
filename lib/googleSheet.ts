const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby4iOh7KDCpBf_Dl76RJlEw4wthCJRtYwEzOtDzaioN9tgwWsFXbsBrbrCj5FEICmg/exec";

export async function submitRegistration(data: any) {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      // Use text/plain to avoid CORS preflight OPTIONS request blocking the request
      "Content-Type": "text/plain;charset=utf-8",
    },
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
