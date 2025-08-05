import { fazerPergunta } from './question.js'
import { inicializaModelo } from './modelo.js'

const model = await inicializaModelo("gemini-1.5-flash");

export async function perguntar() {
const prompt = await fazerPergunta("Me faça um pergunta sobre um determinado destino: ");

    const parts = [
        { text: "Você é o chatbot de um site que vende pacotes de viagem." },
        { text: `input: ${ prompt }` },
        { text: "output: " }
    ];
    const result = await model.generateContent({
        contents: [{ role: "user", parts }]}
    );
    const response = await result.response;
    const text = response.text();
    console.log(text);
}
