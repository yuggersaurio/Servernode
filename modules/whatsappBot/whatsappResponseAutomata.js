const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const axios = require('axios');
const qrcode = require('qrcode-terminal');

const SAVE_PATH = 'C:\\Users\\portalhouses\\Dropbox\\Fotos\\FOTOS_FIRMA_DE_CONTRATOS\\CTO_'; // Ruta donde se guardarán los archivos recibidos


client.on('qr', (qr) => {
  // Escanear el código QR con tu teléfono
  console.log('Escanee el siguiente código QR:', qr);
  qrcode.generate(qr, {small: true});


});

client.on('ready', () => {
  console.log('Cliente listo');
});


// Evento para recibir mensajes
client.on('message', async (msg) => {
  try {
    if (msg.hasMedia || msg.body.substring(0, 9) == 'inventario') {
      const mediaData = await msg.downloadMedia();
      if (msg.type === 'document') {
        const fileName = `${SAVE_PATH}${msg.body}\\DOCUMENTOS\\Inventario_Inicial_${msg.body}.pdf`;
        fs.writeFileSync(fileName, mediaData.data, 'base64');
        console.log(`El archivo ${fileName} se ha guardado correctamente.`);
      }
    }
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }
});

client.on('message', async (msg) => {
  try {
    if (msg.hasMedia) {
      const mediaData = await msg.downloadMedia();
      if (msg.type === 'image') {
        const milisegundosActuales = new Date().getTime();
        console.log(milisegundosActuales);
        const fileName = `${SAVE_PATH}${msg.body}\\INV_INICIAL\\${msg.body}${milisegundosActuales}.jpg`;
        fs.writeFileSync(fileName, mediaData.data, 'base64');
        console.log(`El archivo ${fileName} se ha guardado correctamente.`);
      }
    }
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }
});

client.on('ready', () => {
  console.log('¡WhatsApp Web está listo y conectado!');
});

client.on('auth_failure', () => {
  console.error('Error de autenticación, reinicia el programa.');
});

client.on('disconnected', (reason) => {
  console.log('WhatsApp Web desconectado:', reason);
});

client.initialize();