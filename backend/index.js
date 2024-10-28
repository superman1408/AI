import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

//Authenticate with our api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);