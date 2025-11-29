const mineflayer = require('mineflayer');
const http = require('http');

// Cria o bot do Mineflayer
const bot = mineflayer.createBot({
  host: '49.13.78.66',      // IP do servidor
  port: 25579,              // porta
  username: 'BotAFK',       // nome do bot
  version: '1.21.6'         // versão
});

// Cria um servidor HTTP simples que escuta em uma porta (evita o erro da Render)
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Bot está a funcionar em segundo plano');
});

// Render vai fornecer uma porta automaticamente
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor fictício a escutar na porta ${port}`);
});

// Quando o bot entra no servidor
bot.on('spawn', () => {
  console.log('Bot entrou no servidor e está AFK...');
});

// Mantém o bot pulando a cada 30 segundos
setInterval(() => {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 200);
}, 30000);


