import { fazerPergunta } from './question.js'
import { inicializaModelo } from './modelo.js'

const model = await inicializaModelo("gemini-1.5-flash");

export async function consultar() {
    const categorias = await fazerPergunta("Me fale sobre as categorias de um deteriminado destino que deseja visualizar: ");

    const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ");

    const parts = [
        {text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter as categorias que forem solicitadas no momento da pergunta. Alguns exemplos de categorias: características, localização, cultura, pontos turísticos, clime, dicas, como chegar, culinária, curiosidades."},
        {text: `input: me fale sobre ${categorias} o destino ${prompt}`},
        {text: "output: "}
    ];
    const result = await model.generateContent({
        contents: [{ role: "user", parts }]}
    );
    const response = await result.response;
    const text = response.text();
    console.log(text);
}