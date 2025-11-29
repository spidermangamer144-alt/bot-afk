const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: '49.13.78.66',      // IP do servidor
  port: 25579,              // porta
  username: 'BotAFK',       // nome do bot
  version: '1.21.6'           // force 1.21.10 mesmo para 1.21.10
});

bot.on('spawn', () => {
  console.log('Bot entrou no servidor e está AFK...');
});

// Mantém o bot pulando a cada 30 segundos
setInterval(() => {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 200);
}, 30000);

