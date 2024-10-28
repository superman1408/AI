import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9090;

//Authenticate with our api key
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });


// const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//             role: "user",
//             content: "who won the world series in 2020",
//         },
//         {
//             role: "assistant",
//             content: "the Los Angeles Dogers won the World Series in 2020",
//         },
//         {
//             role: "user", content: "Where was it played?"
//         },
//     ],
// });

// console.log(completion.choices[0].message);


//Creating a Routes


//!Global variable to hold the conversation history
let conversationHistory = [{
    role: "system",
    content: "You are a helpful assistant."
}];


app.get('/', (req, res) => { 
    res.send("AI SERVER is running...!!");
});


app.post('/ask', async (req, res) => { 
    const userMessage = req.body.message;

    //! Update the conversation histry with the user's message
    conversationHistory.push({
        role: "user",
        content: userMessage,
    });

    try {
        const completions = OpenAI.Chat.Completions.Create({
            message: conversationHistory,
            model: "gpt-3.5-turbo",
        });

        //! Extract the response
        const botResponse = completions.choices[0].message.content;

        //! Send the Response
        res.json({message: botResponse})
    } catch (error) {
        res.status(500).send("Error generating responce from OpenAI");
    }
});





//Running the Server
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}..`);
});