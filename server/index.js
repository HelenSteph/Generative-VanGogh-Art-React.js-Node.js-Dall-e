import OpenAI from 'openai';
import dotenv from "dotenv";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Remove the trailing slash

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});

app.post("/dalle", async (req, res) => {
    let prompt = req.body.prompt;
    console.log('Received prompt:', prompt); 
    let response = await promptDALLE(prompt);

    res.send(response);
});

let promptDALLE = async (prompt) => {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    let image_url = response.data[0].url;
    return image_url;
};