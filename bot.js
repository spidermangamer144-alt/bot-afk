const mineflayer = require('mineflayer');
const http = require('http');

// Função para criar o bot
function createBot() {
  const bot = mineflayer.createBot({
    host: '49.13.78.66',      // IP do servidor
    port: 25579,              // Porta
    username: 'BotAFK',       // Nome do bot
    version: '1.10.0',        // Versão do Minecraft
    connectTimeout: 5000,     // Timeout de conexão (5 segundos)
    keepAlive: true           // Manter a conexão viva
  });

  // Quando o bot entrar no servidor
  bot.on('spawn', () => {
    console.log('Bot entrou no servidor e está AFK...');
  });

  // Detecta erros e reconecta automaticamente
  bot.on('error', (err) => {
    console.error('Erro detectado no bot:', err);
    bot.quit();  // Fechar a conexão do bot
    setTimeout(createBot, 5000);  // Tentar reconectar após 5 segundos
  });

  // Quando o bot se desconectar
  bot.on('end', () => {
    console.log('Bot foi desconectado, tentando reconectar...');
    setTimeout(createBot, 5000);  // Tentar reconectar após 5 segundos
  });

  // Faz o bot pular a cada 30 segundos para evitar inatividade
  setInterval(() => {
    if (bot && bot.isSpawned) {
      console.log('Bot pulando...');
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 200);
    }
  }, 30000);  // A cada 30 segundos

  return bot;
}

// Inicia o bot
let bot = createBot();

// Cria um servidor HTTP simples para evitar que o Render/Heroku coloquem a aplicação em sleep
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Bot está funcionando em segundo plano');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor HTTP ouvindo na porta ${port}`);
});
