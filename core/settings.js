const config = require('../config.json');
const status = `}help`;


module.exports = {
  bot: {
    info: {
      prefix: config.prefix || '$',
      token: config.token,
      invLink: '',
    },
    options: {
      founders: ['276705058370879489'],
      privateMode: false,
    },
    presence: {
      name: '/novaworld' || status,
      type: 'STREAMING',
      url: 'https://twitch.tv/nekros_95'
    },
    credits: {
      developerId: '276705058370879489',
      developer: 'Nova World',
    }
  }
}