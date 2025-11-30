const mineflayer = require('mineflayer');
const http = require('http');

// Função para criar o bot
function createBot() {
  // Cria o bot com os parâmetros corretos
  const bot = mineflayer.createBot({
    host: '49.13.78.66',      // IP do servidor Minecraft
    port: 25579,              // Porta do servidor
    username: 'BotAFK',       // Nome do bot
    version: '1.16.5',        // Versão do Minecraft (altere se necessário)
    connectTimeout: 10000,    // Timeout de 10 segundos
    keepAlive: true           // Manter a conexão viva
  });

  // Quando o bot entra no servidor
  bot.on('spawn', () => {
    console.log('Bot entrou no servidor com sucesso!');
  });

  // Monitorando o erro do bot
  bot.on('error', (err) => {
    console.error('Erro detectado no bot:', err);
    bot.quit();  // Fechar a conexão do bot
    setTimeout(createBot, 5000);  // Tentar reconectar após 5 segundos
  });

  // Quando o bot se desconectar
  bot.on('end', () => {
    console.log('Bot foi desconectado. Tentando reconectar...');
    setTimeout(createBot, 5000);  // Tentar reconectar após 5 segundos
  });

  // Manutenção do bot: Faz o bot pular e interagir com o servidor
  setInterval(() => {
    if (bot && bot.isSpawned) {
      console.log('Bot pulando...');
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 200);
      
      // Enviar uma mensagem no chat para evitar inatividade
      bot.chat('Estou ainda aqui!');
    }
  }, 15000);  // Faz isso a cada 15 segundos (ajustável)

  return bot;
}

// Inicia o bot
let bot = createBot();

// Criação do servidor HTTP simples para evitar que o Render/Heroku coloquem o bot em hibernação
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Bot está funcionando em segundo plano');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor HTTP ouvindo na porta ${port}`);
});
