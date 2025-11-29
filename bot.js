const mineflayer = require('mineflayer');
const http = require('http');

// Cria o bot do Mineflayer
const bot = mineflayer.createBot({
  host: '49.13.78.66',
  port: 25579,
  username: 'BotAFK',
  version: '1.21.6'
});

// Cria um servidor HTTP simples
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Bot está a funcionar em segundo plano');
});

// Ouve na porta fornecida pela Render ou 3000
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

// Monitorando desconexões e erros
bot.on('end', () => {
  console.log('Bot foi desconectado do servidor');
});

bot.on('error', (err) => {
  console.log('Erro no bot:', err);
});

// Aqui você pode colocar o monitoramento do servidor HTTP
setInterval(() => {
  http.get(`http://localhost:${port}`, (res) => {
    if (res.statusCode === 200) {
      console.log('Servidor HTTP está funcionando!');
    }
  }).on('error', (err) => {
    console.log('Erro ao acessar o servidor HTTP:', err);
  });
}, 60000); // Verifica a cada 1 minuto
