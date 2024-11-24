const axios = require("axios");
require("dotenv").config({
  path: "./.env",
});
// const { defineSecret } = require("firebase-functions/params");

// const openAiDevKeySecret = defineSecret("openAiDevKey");

const { API_KEY, AI_MODEL, URI } = process.env;

const controller = async (req, res) => {
  // Extract the prompt from the client data
  const {
    occupation,
    seniority,
    SeniorityLevelDescription,
    bestAdjective,
    country,
  } = req.body;

  try {
    // Make a request to the OpenAI API
    const response = await axios.post(
      URI,
      {
        model: AI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are an expert CV writer specializing in writing professional CVs for various purposes; you will get the occupation, seniority, seniority level description, person country, and the best adjective that describes the person. Then, generate a CV based on the required parameters. the employer name and university name should look realistic. the reply should be in JSON format only.",
          },
          {
            role: "user",
            content: JSON.stringify({
              occupation,
              seniority,
              SeniorityLevelDescription,
              bestAdjective,
              country,
              requiredParameters: {
                Summary: "",
                Keywords: "",
                ProfessionalExperience: [
                  //generate 2 entries
                  {
                    JobTitle: "",
                    EmployerName: "",
                    StartingDate: "",
                    EndDate: "",
                    Description: "",
                  },
                ],
                EducationAndTraining: [
                  //generate 2 entries
                  {
                    Degree: "",
                    UniversityOrSchool: "",
                    StartingDate: "",
                    EndDate: "",
                    Description: "",
                  },
                ],
                Abilities: [{ AbilityName: "", Level: "" }],
                Skills: [{ Skill: "", Description: "" }],
                FurtherInformation: "",
              },
            }),
          },
        ],
        temperature: 1.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          //   Authorization: `Bearer ${await openAiDevKeySecret.value()}`, // Ensure proper retrieval of the secret
        },
      }
    );

    // Extract and return the generated text from the OpenAI response
    const generatedResult = response?.data?.choices[0]?.message?.content;
    console.log("generatedResult", generatedResult ?? "no response");
    // return { result: generatedResult };
    res.status(200).json(generatedResult);
  } catch (error) {
    // res.status(400).json({ error: error });
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("OpenAI API Error:", error.response.data);
      console.error("Status Code:", error.response.status);
      res.status(400).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      res.status(400).json({ error: error.request });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      res.status(400).json({ error: error.message });
    }
    // throw new HttpsError("internal", "Error contacting OpenAI API.");
  }
};

module.exports = { controller };
