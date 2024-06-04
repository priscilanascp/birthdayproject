// Lógica para a contagem regressiva
const birthday = new Date('2024-01-24').getTime();

function showCountdown() {
  const now = new Date().getTime();
  const distance = birthday - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(showCountdown, 1000);
showCountdown();

// Lógica para a galeria de fotos (modal)
function abrirModal(imagem, legenda) {
  const modal = document.getElementById('modal');
  const imagemModal = document.getElementById('imagemModal');
  const legendaModal = document.getElementById("legendaModal");

  imagemModal.src = imagem;
  legendaModal.innerText = legenda;
  modal.style.display = 'block';
}

function fecharModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}










const perguntas = [
    {
      pergunta: 'Em que ano nos conhecemos?',
      opcoes: ['2015', '2014', '2013'],
      resposta: '2014'
    },
    {
      pergunta: 'Qual era o music video que a gente costumava assistir e zoar na sala de aula?',
      opcoes: ['use somebody - kings of leon', 'dani california - red hot chili peppers', 'hero - nickelback'],
      resposta: 'hero - nickelback'
    },
    {
      pergunta: 'Qual desses momentos engraçados é o mais lembrado por nós?',
      opcoes: ['empurrão pra fora do elevador', 'senhorinha pedindo pra orar na minha cabeça', 'queda na recepção'],
      resposta: 'senhorinha pedindo pra orar na minha cabeça'
    },
    {
      pergunta: 'Qual nosso apelidinho mais memorável?',
      opcoes: ['Pristianne', 'booboos', 'pandinhas'],
      resposta: 'Pristianne'  
    },
    {
      pergunta: 'Qual das prof/enf odiava mais a gente?',
      opcoes: ['enf do coroado', 'prof de politicas de saude', 'enf do chapot'],
      resposta: 'prof de politicas de saude'
    },
    {
      pergunta: 'Qual nosso hobby favorito?',
      opcoes: ['fofocar da vida dos outros', 'rir de videos de dublagens', 'zoar com erros de português'],
      resposta: 'zoar com erros de português'
    },
    {
      pergunta: 'Sobre o que foi nossa primeira conversa no whatsapp?',
      opcoes: ['sobre alguém da nossa sala', 'sobre o emoji/apelido de panda', 'alguma materia/assunto do curso'],
      resposta: 'sobre o emoji/apelido de panda'
    },
    {
      pergunta: 'O que nos fez tornar amigas?',
      opcoes: ['mesma desordem mental', 'nossa inteligência', 'estilos parecidos'],
      resposta: 'mesma desordem mental'
    },
    {
      pergunta: 'Qual foi nosso momento de maior dificuldade , onde a gente pensou que não teria mais volta?',
      opcoes: ['rompimento de relacionamento em 2019', 'meu sumiço devido a surto psicótico em 2020', 'block de aniversário em 2016'],
      resposta: 'meu sumiço devido a surto psicótico em 2020'
    },
    {
      pergunta: 'Quem era nosso(a) maior shippador?',
      opcoes: ['Glendha', 'Ana', 'Iago'],
      resposta: 'Glendha'
    }
  ];

  const mensagensAdicionais = {
    'Pristianne': '  é literalmente a gente <3',
    'prof de politicas de saude': ' sempre tentando separar a gente ',
    'meu sumiço devido a surto psicótico em 2020':  ', nem eu sabia se eu iria voltar pro mundo rsrs',
    'Glendha': ', pois a Ana e Iago são os maiores haters de Pristianne rsrs'
    // Adicione outras respostas e suas mensagens aqui
  };

  const memoryGameElement = document.getElementById('memory-game');
  const questionContainer = document.getElementById('question-container');

perguntas.forEach((pergunta, index) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('memory-card');
  cardElement.dataset.question = pergunta.pergunta;
  cardElement.dataset.options = JSON.stringify(pergunta.opcoes);
  cardElement.dataset.answer = pergunta.resposta;
  cardElement.textContent = index + 1;
  memoryGameElement.appendChild(cardElement);

  cardElement.addEventListener('click', function() {
    exibirPergunta(pergunta.pergunta, pergunta.opcoes, pergunta.resposta);
  });
});

let firstCardClicked = null;
let secondCardClicked = null;
let pontuacao = 0;
const totalPerguntas = perguntas.length;
let perguntasRespondidas = 0;


function exibirPergunta(pergunta, opcoes, respostaCorreta) {
    questionContainer.innerHTML = `<h2>${pergunta}</h2>`;
    const botoesResposta = [];
    opcoes.forEach(opcao => {
      const botao = document.createElement('button');
      botao.textContent = opcao;
      botao.setAttribute('data-respondida', 'false'); // Adiciona atributo para controlar se a pergunta já foi respondida
      botao.onclick = function() {
        verificarResposta(opcao, respostaCorreta);
      };
      botoesResposta.push(botao);
    });
    botoesResposta.forEach(botao => {
      questionContainer.appendChild(botao);
    });
  }
  
  function verificarResposta(respostaSelecionada, respostaCorreta) {
    const respostaCorretaFormatada = respostaCorreta.toLowerCase();
    const respostaSelecionadaFormatada = respostaSelecionada.toLowerCase();
  
    if (respostaCorretaFormatada === respostaSelecionadaFormatada) {
      let mensagemAdicional = mensagensAdicionais[respostaCorreta] || '';
      let respostaConcatenada = respostaCorreta + mensagemAdicional;
      questionContainer.innerHTML = `<h2>Resposta Correta!</h2><p>${respostaConcatenada}</p>`;
      pontuacao++;
    } else {
      questionContainer.innerHTML = `<h2>Resposta Errada!</h2><p>A resposta correta era: ${respostaCorreta}</p>`;
    }
  
    // Incrementa o número de perguntas respondidas
    perguntasRespondidas++;
  
    // Se todas as perguntas forem respondidas, mostrar o botão "Ver Resultado"
    if (perguntasRespondidas === totalPerguntas) {
      mostrarBotaoResultado();
    }
  }
  
  function mostrarBotaoResultado() {
    const containerPerguntas = document.getElementById('question-container');
    const botaoVerResultado = document.createElement('button');
    botaoVerResultado.textContent = 'Ver Resultado';
    botaoVerResultado.addEventListener('click', function() {
      mostrarResultado();
    });
    containerPerguntas.appendChild(botaoVerResultado);
  }
  
  function mostrarResultado() {
    const mensagemFinal = `Você acertou ${pontuacao} de ${totalPerguntas} perguntas!`;
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<h2>Resultado Final</h2><p>${mensagemFinal}</p>`;
  }
  
  function mostrarResultado() {
    const mensagemFinal = `Você acertou ${pontuacao} de ${totalPerguntas} perguntas!`;
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<h2>Resultado Final</h2><p>${mensagemFinal}</p>`;
  }
  