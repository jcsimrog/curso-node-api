const { IncomingWebhook } = require("@slack/webhook");
//const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK ||'');

const loggerStream = {
  write: (message) => {
    // webHook.send({          //Todo lo que esta dentro de write se puede conectar a lo que sea, Slack, Telegram, etc.. lo actual es para Slack
    //   text: message,
    // });
    console.log(message)
  },
};

module.exports = loggerStream