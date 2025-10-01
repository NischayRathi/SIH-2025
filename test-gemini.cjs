// Simple test script to verify Gemini API connection
require("dotenv").config();

async function testGeminiAPI() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in environment");
    return;
  }

  console.log(`✅ API Key found: ${apiKey.substring(0, 10)}...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Say "Hello, I am AyurBot!" in a friendly way.',
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error (${response.status}):`, errorText);
      return;
    }

    const data = await response.json();
    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botResponse) {
      console.log("✅ API Test Successful!");
      console.log("🤖 Response:", botResponse.trim());
    } else {
      console.error("❌ No valid response received");
      console.log("Raw response:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

testGeminiAPI();
