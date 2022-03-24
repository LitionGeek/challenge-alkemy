const envioEmail = require("@sendgrid/mail");
require('dotenv').config()
envioEmail.setApiKey(process.env.KEY_SENDEMAIL);

const enviarEmail = (email) => {
    const correoAEnviar = {
        to: email, 
        from: 'alanalexis97@hotmail.com', 
        subject: "Bienvenido a DisneyPreuba",
        text: "<strong>Bienvenido</strong>, te damos las gracias por registrarte en disneyPrueba",
    }
    envioEmail
    .send(correoAEnviar)
    .then(() => {
      console.log('Email enviado')
    })
    .catch((error) => {
      console.error(error)
    })
  
}

module.exports = enviarEmail;