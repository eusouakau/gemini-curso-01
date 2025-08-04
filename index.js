import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from './question.js'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ");

  const parts = [
    {text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, seja bairro, cidade, país ou continente, por exemplo,  você poderá fornecer informações. Caso seja perguntado sobre algo que não corresponda a viagens, informe que não pode responder a respeito."},
    {text: `input: me fale sobre o destino ${prompt}`},
    {text: "output: "},
];
  const result = await model.generateContent({
    contents: [{ role: "user", parts }]}
  );
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();