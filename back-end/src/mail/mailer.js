//Configurar nodemiler (Memsajes de contacto a mi correo y enviar token de recuperación a usuarios)
const nodemailer = require("nodemailer"),
          config = require('config');

    
    transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'yudieskel@gmail.com',
            pass: config.get('adminAPI')
        }
    });

module.exports = transport;