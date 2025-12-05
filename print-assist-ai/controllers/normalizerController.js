// controllers/normalizerController.js (UPDATED with core logic)

// Helper function to extract potential dates (YYYY or YYYY-YYYY or YYYY-Present)
// controllers/normalizerController.js (Updated extractDates function)

function extractDates(text) {
  // Regex targets: YYYY or YYYY-YYYY or YYYY - YYYY, ignoring the content of the separator.
  const dateRegex =
    /\b(\d{4}[\s]*[—\- to present]*[\s]*\d{4}|\d{4}[\s]*[—\- to present]*[\s]*(present|today))(?:\s+\bfont\b)?/gi;
  const dates = [];

  let match;
  while ((match = dateRegex.exec(text)) !== null) {
    // Clean up the match to a standardized format
    let cleanDate = match[0]
      .trim()
      .replace(/\s+-\s+/g, "-")
      .replace(/ to present| to Present| to today/i, "-Present");
    cleanDate = cleanDate.replace(/\bfont\s*\d*\b/gi, "").trim(); // Remove "Font 4" if attached
    dates.push(cleanDate);
  }
  return dates;
}

// Helper function to separate names and clean up remaining text
// controllers/normalizerController.js (Updated extractNamesAndClean function)

// controllers/normalizerController.js (CRITICAL FIX)

// controllers/normalizerController.js (FINALIZED CLEANUP FIX)

function extractNamesAndClean(text, dates) {
  let cleanText = text;
  let names = [];

  // 1. Remove all extracted dates first
  dates.forEach((date) => {
    // Ensuring date replacement is safe by escaping regex special characters
    cleanText = cleanText.replace(
      new RegExp(date.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
      ""
    );
  });

  // 2. AGGRESSIVE INSTRUCTIONAL & AUXILIARY WORD REMOVAL (THE FIX)
  cleanText = cleanText.replace(
    /pet's names|pet names|names|name:|dates|date|font|style|choose|text:|date\s*range|est\.\s*\d{4}/gi,
    ""
  );
  cleanText = cleanText.replace(
    /[,.;:/&]| and | & | are | must be | must | the | to | is /gi,
    " "
  ); // <-- ADDED auxiliary words
  cleanText = cleanText.replace(/\b(\d+)\b/g, ""); // Remove stray numbers

  // 3. Filter the remaining text
  // Filter words greater than 2 characters (retaining this, but adding stop words below)
  names = cleanText.split(/\s+/).filter((word) => word.length > 2);

  // Capitalize first letter of each name
  names = names.map(
    (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  );

  // --- STOP WORD LIST FILTER (FINAL SAFETY CHECK) ---
  // Remove common non-name words that might still be left (e.g., from weird spacing)
  const stopWords = [
    "name",
    "date",
    "font",
    "style",
    "choose",
    "pets",
    "are",
    "and",
    "must",
    "the",
    "text",
    "should",
    "was",
    "were",
    "it",
    "from",
    "mustbe",
    "for", // Added key words like 'are' and 'must'
  ];

  names = [...new Set(names)].filter(
    (name) => !stopWords.includes(name.toLowerCase())
  );

  return names;
}

// controllers/normalizerController.js (NEW AI FUNCTION)
// --- JSDOC FIX: Use the specific import syntax for module export ---
/**
 * @typedef {import('axios').AxiosInstance} AxiosInstance
 */

// The two-step conversion: -> unknown -> AxiosInstance
/** @type {AxiosInstance} */
const axios = /** @type {AxiosInstance} */ (
  /** @type {unknown} */ (require("axios"))
);
// --- END JSDOC FIX ---

// Placeholder for the LLM API endpoint (e.g., Google Gemini)
const AI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const AI_API_KEY = process.env.GEMINI_API_KEY; // Pulled from Render ENV

/**
 * Sends raw text to the LLM and requests clean JSON output.
 * @param {string} rawInput
 * @returns {Promise<object | null>} The structured JSON object from the AI.
 */
async function normalizeWithAI(rawInput) {
  if (!AI_API_KEY) {
    console.error("AI API Key is missing. Skipping AI normalization.");
    return null;
  }

  const systemInstruction = `You are a strict data parsing API for a print-on-demand service. Your ONLY task is to extract names and date ranges from the user input and return them in a clean JSON format. DO NOT include extra words, instructions, or notes. If data is not found, use an empty array or null.`;

  const prompt = `Raw Customer Input: "${rawInput}".\n\nReturn the data strictly in this JSON format: {"names": ["name1", "name2"], "dates": ["YYYY-YYYY", "YYYY-Present"], "message": null}.`;

  try {
    const response = await axios.post(
      AI_API_URL,
      {
        // Contents is at the top level
        contents: [{ role: "user", parts: [{ text: prompt }] }],

        // Configuration, including system instruction and schema, is at the top level
        generationConfig: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              names: { type: "array" },
              dates: { type: "array" },
              message: { type: "string" },
            },
          },
        },
      }, // End of payload object
      {
        headers: { "x-goog-api-key": AI_API_KEY },
      }
    );

    // The AI response is usually a stringified JSON inside the text field
    let jsonString = response.data.candidates[0].content.parts[0].text.trim();

    // --- CRITICAL FIX: Robust JSON Extraction ---
    // 1. Remove markdown fences (```json) if the AI included them
    if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    }

    // 2. Safely parse the cleaned string
    return JSON.parse(jsonString);
  } catch (error) {
    // Log the failure to the console for debugging
    console.error("AI Normalization Failed:", error.message);
    // Log the response data that caused the parse error if possible
    if (error.response && error.response.data) {
      console.error("AI Response Data:", JSON.stringify(error.response.data));
    }
    return null;
  }
}

// @route   POST /api/normalizer/process
// @desc    Processes raw personalization data and normalizes it.
// @access  Private (Requires subscription)
exports.processData = async (req, res) => {
  // req.user is available because of the 'protect' middleware!
  const { rawInput } = req.body;

  if (!rawInput) {
    return res.status(400).json({ msg: "Raw input text is required." });
  }

  try {
    // --- 1. RULE-BASED ATTEMPT ---
    // let dates = extractDates(rawInput);
    // let names = extractNamesAndClean(rawInput, dates);
    let dates = null;
    let names = null;
    let finalData = null;

    // --- 2. AI FALLBACK CHECK ---
    // If Rule-Based finds no names, we escalate to the AI
    // if (names.length === 0) {
    //   console.log(
    //     "Rule-based extraction failed to find names. Escalating to AI."
    //   );
    if (true) {
      // <--- CRITICAL DEBUGGING CHANGE: Forces AI execution
      console.log("DEBUG: Forcing AI execution.");
      const aiResult = await normalizeWithAI(rawInput);

      if (aiResult && aiResult.names && aiResult.names.length > 0) {
        // SUCCESS: Use AI result and format it
        finalData = {
          status: "normalized_success_ai",
          raw: rawInput,
          // Reformat the AI names/dates into your standardized string
          cleaned:
            aiResult.names.join(", ") +
            (aiResult.dates && aiResult.dates.length > 0
              ? " (" + aiResult.dates.join(", ") + ")"
              : ""),
          structure: aiResult,
        };
      }
    }

    // --- 3. RULE-BASED SUCCESS ---
    // if (!finalData) {
    //   finalData = {
    //     status: "normalized_success_rule",
    //     raw: rawInput,
    //     cleaned:
    //       names.join(", ") +
    //       (dates.length > 0 ? " (" + dates.join(", ") + ")" : ""),
    //     structure: {
    //       names,
    //       dates,
    //       message:
    //         names.length === 0 && dates.length === 0
    //           ? "No recognizable data found."
    //           : null,
    //     },
    //   };
    // }

    res.json({
      msg: `Data processed using ${
        finalData.status.includes("ai") ? "AI Fallback" : "Rule-Based Logic"
      }.`,
      result: finalData,
    });
  } catch (error) {
    console.error("Normalization Error:", error);
    res.status(500).json({ msg: "Internal server error during processing." });
  }
};
