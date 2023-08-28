const { Client,MessageMedia  } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');
const fnConsultaSQL = require('./consultaSQL.js');
const fnConsultaSQLPay = require('./consultaSQLpay.js');
const {fnConsultaHorarioAtencion,fnHoraActual} = require('./funciones.js');
const media = MessageMedia.fromFilePath('img/publish.jpg'); // Reemplaza 'ruta/imagen.jpg' con la ruta de la imagen que deseas enviar






//------------------------------------------------------------------------------



client.on('qr', (qr) => {
    // Escanear el código QR con tu teléfono
    console.log('Escanee el siguiente código QR:', qr);
    qrcode.generate(qr, {small: true});


  });
  
  client.on('ready', () => {
    console.log('Cliente listo');
      
/*      let cobranzaEnviada=0; 

      if(cobranzaEnviada!=1){// Si no se ha enviado cobranza, que envie

        fnConsultaSQLPay()
          .then(resultado => {
              resultado.forEach((elemento, indice) => {
                console.log(`Mensaje ${indice + 1} enviado al teléfono ${elemento.telefono}`);
                client.sendMessage("57"+ elemento.telefono+ "@c.us", "Señor(a) " + elemento.nombre + "\n\nRef.: Mora en el contrato de arrendamiento No. "+ elemento.contrato +"\n\nDando cumplimiento a lo establecido en la ley 1266 del 2008 de Habeas Data y demás normas concordantes, y a su autorización expresa en el contrato de arrendamiento suscrito, ​PORTALHOUSES.COM (MURGUEITIO INMUEBLES S.A.S) se permite recordarle que a la fecha no ha sido cancelado el canon de arrendamiento del mes en curso que, según la cláusula Sexta del contrato, debió cancelarse de manera anticipada dentro de los cinco (5) primeros días del mes. Por esta razón se han generado intereses de mora a la tasa más alta autorizada por la ley.\n\nPor lo anterior, cordialmente lo invitamos a subsanar la referida mora, ya que llegado el día 15 del presente mes sin haber cancelado el canon y los intereses, el  contrato se remitirá a cobro prejurídico debiendo cancelar un valor adicional por dicho concepto. De no lograrse la normalización del pago, se dará inicio a las acciones legales para el cobro de lo adeudado más la cláusula penal pactada en el contrato, y se realizará el reporte ante data crédito suyo y de sus coarrendatarios, el cual incidirá en su comportamiento de pago. Sea esta una notificación para que a partir de la fecha se contabilicen los términos señalados en la ley del Habeas Data para realizar el reporte.\n\nAtentamente, ​Departamento de Cartera");
                client.sendMessage("57"+ elemento.telefono+ "@c.us", media);
                //cobranzaEnviada=1; // Estado de cobranza a enviada
  
              });
          })
          .catch(error => {
            console.error(error);
            
          });//-----------------------------------------------------------
  
          
  
          
      }  

  /*let horaProcesada = setInterval(() => { ///Almaceno hora actual usando la funcion de fnHoraactual
      const resultadoHora = fnHoraActual();
      console.log(resultadoHora);


  
      if(resultadoHora==16){ }//verifico si son las 10 AM
       

  }, 60000);*////Este codigo servirá para programar los envios


  });

  client.on('message', (message) => {
    const sender = message.from;
    const text = message.body;
    

    if(message.from = "573152675510@c.us" && message.body == 'enviarmorosos') {

      let fechaMes = new Date();
      let dia = fechaMes.getDate();

      console.log("Hoy es ")
fnConsultaSQLPay()
      .then(resultado => {
          resultado.forEach((elemento, indice) => {
            console.log(`Mensaje ${indice + 1} enviado al teléfono ${elemento.celular}`);
            if(dia < 16){
              client.sendMessage("57"+ elemento.celular+ "@c.us", "Señor(a) " + elemento.nombre + "\n\nRef.: Mora en el contrato de arrendamiento No. "+ elemento.contrato +"\n\nDando cumplimiento a lo establecido en la ley 1266 del 2008 de Habeas Data y demás normas concordantes, y a su autorización expresa en el contrato de arrendamiento suscrito, ​PORTALHOUSES.COM (MURGUEITIO INMUEBLES S.A.S) se permite recordarle que a la fecha no ha sido cancelado el canon de arrendamiento del mes en curso que, según la cláusula Sexta del contrato, debió cancelarse de manera anticipada dentro de los cinco (5) primeros días del mes. Por esta razón se han generado intereses de mora a la tasa más alta autorizada por la ley.\n\nPor lo anterior, cordialmente lo invitamos a subsanar la referida mora, ya que llegado el día 15 del presente mes sin haber cancelado el canon y los intereses, el  contrato se remitirá a cobro prejurídico debiendo cancelar un valor adicional por dicho concepto. De no lograrse la normalización del pago, se dará inicio a las acciones legales para el cobro de lo adeudado más la cláusula penal pactada en el contrato, y se realizará el reporte ante data crédito suyo y de sus coarrendatarios, el cual incidirá en su comportamiento de pago. Sea esta una notificación para que a partir de la fecha se contabilicen los términos señalados en la ley del Habeas Data para realizar el reporte.\n\nAtentamente, ​Departamento de Cartera");
            }else{

              client.sendMessage("57"+ elemento.celular+ "@c.us", "Señor(a) " + elemento.nombre + "\n\nRef.: Mora en el contrato de arrendamiento No. "+ elemento.contrato +"\n\nDando cumplimiento a lo establecido en la ley 1266 del 2008 de Habeas Data y demás normas concordantes, y a su autorización expresa en el contrato de arrendamiento suscrito, dado que no han sido atendidos los requerimientos efectuados por PORTALHOUSES.COM (MURGUEITIO INMUEBLES S.A.S), he recibido sus documentos para el cobro pre jurídico. A partir de este momento se le concede un plazo de tres (3) días para que se presente en las oficinas de la inmobiliaria, con el fin de cumplir con sus obligaciones, es decir, el pago de cánones, intereses moratorios y honorarios. De hacer caso omiso a este requerimiento, y si esta mora se extiende hasta el día 30 del mes en curso, se avocarían las cláusulas que entrañan una acción judicial, donde, entre otras, se hará exigible el pago de la cláusula penal.\n\nFavor tener presente que, como requisito indispensable, deberá presentar ante PORTALHOUSES.COM (MURGUEITIO INMUEBLES S.A.S) la última factura de servicios públicos cancelada, para poder expedir el cupón autorizado y/o recibir su pago.\n\nRecuerde que una vez vencido el término señalado en la ley del Habeas Data para que la entidad arrendadora efectúe el reporte negativo ante Datacredito, éste incidirá en su comportamiento de pago.\n\nAtentamente\n\nMaria Isabel Mejia Arango\nAbogada");
            }
            contadorEnvios ++;
           
            client.sendMessage("57"+ elemento.celular+ "@c.us", media);
            //cobranzaEnviada=1; // Estado de cobranza a enviada

          });
      })
      .catch(error => {
        console.error(error);
        
      });

      client.sendMessage("57"+ "3206662231"+ "@c.us", "Se han enviado " + contadorEnvios + " mensajes de cobranza");

    }

});


  






  client.initialize();
