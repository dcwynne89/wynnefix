const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const userInput = body.prompt;

  const fullPrompt = `
You are a calm and experienced handyman and repair expert. The user will describe a problem with a tool, engine, household system, or machine.

Respond with:
1. Diagnosis steps
2. Required tools or parts
3. Step-by-step repair instructions
4. Safety warnings if relevant
5. Common mistakes to avoid

Problem: ${userInput}
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.data.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OpenAI request failed." }),
    };
  }
};
