
import ai from "../config/gemini.js";

export const analyzeComplaint = async (req, res) => {
  try {
    const { title,description,category,location } = req.body;

    if (!title|| !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "Complaint description is required",
      });
    }

    // AI analysis logic will be added next
        
    
const response = await ai.models.generateContent({
  model: "gemini-3.5-flash-lite",
  contents: `
    Analyze the following civic complaint.

    
    Title: ${title}
Description: ${description}
Category: ${category}
Location: ${location}
Return the result in JSON format with these fields:

{
  "category": "Road, Water Supply, Electricity, Sanitation, or Other",
  "priority": "Low, Medium, High, or Critical",
  "summary": "A short summary of the complaint",
  "impact": "Explain who may be affected and how",
  "urgencyReason": "Explain why this complaint needs attention",
  "recommendedAction": "Suggest practical steps the officer should take"
}

Base your assessment only on the complaint details.
Do not invent facts that are not mentioned.
Return only valid JSON without markdown formatting.
`,
});

const result = JSON.parse(response.text);

return res.status(200).json({
  success: true,
  message: "Complaint analyzed successfully",
  analysis: result,
});

  } catch (error) {
    console.error("AI Complaint Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze complaint",
    });
  }
};
