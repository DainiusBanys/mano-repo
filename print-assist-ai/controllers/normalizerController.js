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
    // --- CORE NORMALIZATION LOGIC ---
    const dates = extractDates(rawInput);
    const names = extractNamesAndClean(rawInput, dates);

    const normalizedData = {
      status: "normalized_success",
      raw: rawInput,
      cleaned:
        names.join(", ") +
        (dates.length > 0 ? " (" + dates.join(", ") + ")" : ""),
      structure: {
        names: names,
        dates: dates,
        message:
          names.length === 0 && dates.length === 0
            ? "No recognizable data found."
            : null,
      },
    };

    // --------------------------------

    // 3. Return the processed result
    res.json({
      msg: "Data successfully normalized.",
      result: normalizedData,
    });
  } catch (error) {
    console.error("Normalization Error:", error);
    res.status(500).json({ msg: "Internal server error during processing." });
  }
};
