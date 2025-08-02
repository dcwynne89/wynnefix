require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/fix', async (req, res) => {
  const userInput = req.body.prompt;

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

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log('WynneFix server running on port 3000');
});
