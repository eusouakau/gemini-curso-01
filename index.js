import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from './question.js'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "VocÊ é um site de viagens e deve responder somente sobre esse assunto." +
   " Caso o usuário pergunte sobre outros assuntos, diga que não pode responder. " + " O usuário escolheu: " 
   + await fazerPergunta("Me fale sobre o destino que deseja conhecer: ");

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();