const { Client,MessageMedia  } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');
const fnConsultaSQL = require('./consultaSQL.js');
const fnConsultaSQLPay = require('./consultaSQLpay.js');
const {fnConsultaHorarioAtencion} = require('./funciones.js');
const media = MessageMedia.fromFilePath('img/publish.jpg'); // Reemplaza 'ruta/imagen.jpg' con la ruta de la imagen que deseas enviar

let users = {}; //Se almacena el numero de usuario activo
let asesor = 0; //Modo asesor 0 inactivo 1 activo

//Control de la inactividad---------------------------------

let inactivityTimer;
const inactivityThreshold = 180000; //  minutos (en milisegundos)

// Función para reiniciar el temporizador de inactividad
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(handleInactivity, inactivityThreshold);
}


function handleInactivity() {
  
  console.log('El usuario está inactivo');
  // Realizar las acciones necesarias cuando el usuario está inactivo
  asesor = 0;
  users = {};

}

//------------------------------------------------------------------------------


//Mensaje de bienvenida nuevo chat
const welcomeMessage = '¡Bienvenido a Portalhouses.com! 😃, si desea iniciar de inmediato su pago en línea o con cupón de código de barras, digite la opción 3️⃣, de lo contrario seleccione: \n 1️⃣ ¿Cómo pagar en línea? \n 2️⃣ ¿Cómo descargar un cupón de pago? \n 3️⃣ ¡Quiero realizar mi pago en línea ó con cupón! \n \n 🟡 Comunicarme con el dpto.: \n 4️⃣ Cartera \n 5️⃣ Proyectos \n 6️⃣ Administración \n 7️⃣ Comercial \n \n 🟡 ¿Cómo llegar a portalhouses.com? \n 8️⃣ Reportar daños o solicitar reparaciones \n 9️⃣ Ubicación'; 





client.on('qr', (qr) => {
    // Escanear el código QR con tu teléfono
    console.log('Escanee el siguiente código QR:', qr);
    qrcode.generate(qr, {small: true});


  });
  
  client.on('ready', () => {
    console.log('Cliente listo');
  });

  client.on('message', (message) => {
    
    const sender = message.from;
    const text = message.body;
  
    if (!users[sender]) {

        
      users[sender] = true;
      client.sendMessage(sender, welcomeMessage);
      console.log("el que envia" + sender);
      
    }
    

    //------PARA ENVIAR MENSAJES DE COBRANZA

    if(message.body == 'enviarmorosos2222') {

      let fechaMes = new Date();
      let dia = fechaMes.getDate();
      let contadorEnvios ;

      console.log("Hoy es " + dia)
fnConsultaSQLPay()
      .then(resultado => {
          resultado.forEach((elemento, indice) => {
            console.log(`Mensaje ${indice + 1} enviado al teléfono ${elemento.celular}`);
            let telefonoSinEspacios = elemento.celular.replace(/\s+/g, '');
            if(dia < 16){

              client.sendMessage("57"+ telefonoSinEspacios + "@c.us", "Señor(a) " + elemento.nombre + "\n\nRef.: Mora en el contrato de arrendamiento No. "+ elemento.contrato +"\n\nDando cumplimiento a lo establecido en la ley 1266 del 2008 de Habeas Data y demás normas concordantes, y a su autorización expresa en el contrato de arrendamiento suscrito, ​PORTALHOUSES.COM (MURGUEITIO INMUEBLES S.A.S) se permite recordarle que a la fecha no ha sido cancelado el canon de arrendamiento del mes en curso que, según la cláusula Sexta del contrato, debió cancelarse de manera anticipada dentro de los cinco (5) primeros días del mes. Por esta razón se han generado intereses de mora a la tasa más alta autorizada por la ley.\n\nPor lo anterior, cordialmente lo invitamos a subsanar la referida mora, ya que llegado el día 15 del presente mes sin haber cancelado el canon y los intereses, el  contrato se remitirá a cobro prejurídico debiendo cancelar un valor adicional por dicho concepto. De no lograrse la normalización del pago, se dará inicio a las acciones legales para el cobro de lo adeudado más la cláusula penal pactada en el contrato, y se realizará el reporte ante data crédito suyo y de sus coarrendatarios, el cual incidirá en su comportamiento de pago. Sea esta una notificación para que a partir de la fecha se contabilicen los términos señalados en la ley del Habeas Data para realizar el reporte.\n\nAtentamente, ​Departamento de Cartera");
              contadorEnvios = telefonoSinEspacios;
            }else{

              client.sendMessage("57" + telefonoSinEspacios + "@c.us", "Señor(a) " + elemento.nombre + "\n\nRef.: Mora en el contrato de arrendamiento No. "+ elemento.contrato +"\n\nDando cumplimiento a lo establecido en la ley 1266 del 2008 de Habeas Data y demás normas concordantes, y a su autorización expresa en el contrato de arrendamiento suscrito, dado que no han sido atendidos los requerimientos efectuados por PORTALHOUSES.COM (MURGUEITIO INMUEBLES S.A.S), he recibido sus documentos para el cobro pre jurídico. A partir de este momento se le concede un plazo de tres (3) días para que se presente en las oficinas de la inmobiliaria, con el fin de cumplir con sus obligaciones, es decir, el pago de cánones, intereses moratorios y honorarios. De hacer caso omiso a este requerimiento, y si esta mora se extiende hasta el día 30 del mes en curso, se avocarían las cláusulas que entrañan una acción judicial, donde, entre otras, se hará exigible el pago de la cláusula penal.\n\nFavor tener presente que, como requisito indispensable, deberá presentar ante PORTALHOUSES.COM (MURGUEITIO INMUEBLES S.A.S) la última factura de servicios públicos cancelada, para poder expedir el cupón autorizado y/o recibir su pago.\n\nRecuerde que una vez vencido el término señalado en la ley del Habeas Data para que la entidad arrendadora efectúe el reporte negativo ante Datacredito, éste incidirá en su comportamiento de pago.\n\nAtentamente\n\nMaria Isabel Mejia Arango\nAbogada");
              contadorEnvios = telefonoSinEspacios;
            }
           
            client.sendMessage("57" + telefonoSinEspacios + "@c.us", media);
            
            //cobranzaEnviada=1; // Estado de cobranza a enviada

          });
      })
      .catch(error => {
        console.error(error);
        
      });

      client.sendMessage("57"+ "3206662231"+ "@c.us", "😃 Se han enviado los mensajes de cobranza satisfactoriamente.");

    }


    //-------------------------------------FINALIZA ENVIO DE MENSAJES DE COBRANZA



	
    if(message.body === '1' && asesor == 0) {
		client.sendMessage(message.from, 'Para pagar en línea puede utilizar nuestra guia rápida para pagos en línea https://portalhouses.com/clientes/guias/guias/PAGOS%20PSE%20GUIA%20RAPIDA.pdf');
        const paso = "1";
        console.log("estoy en el paso" + paso);
        resetInactivityTimer();
	}
    if(message.body === '2' && asesor == 0) {
		client.sendMessage(message.from, 'Para descargar un cupón para pago puede utilizar nuestra guia rápida para descargar cupones https://portalhouses.com/clientes/guias/guias/PAGOS%20CUPON%20GUIA%20RAPIDA.pdf');
        const paso = "2";
        console.log("estoy en el paso" + paso);
        resetInactivityTimer();
	}
    if(message.body === '3' && asesor == 0) {
		client.sendMessage(message.from, 'Por favor digite su número de cedula o NIT (sin digito de verificación)');
        const paso = "3";
        console.log("estoy en el paso" + paso);
        resetInactivityTimer();
	}

    if(message.body >= 1000000 && asesor == 0) {

        client.sendMessage(message.from,  "Un momento por favor, estamos procesando su solicitud..." );


        

        fnConsultaSQL(message.body)
        .then(resultado => {
            client.sendMessage(message.from,  resultado.resumen );
            client.sendMessage(message.from,  resultado.medio1 );
            client.sendMessage(message.from,  resultado.medio2 );
            client.sendMessage(message.from,  resultado.factura );
            
            client.sendMessage(message.from, media);
            client.sendMessage(message.from,  "¡Gracias por utilizar los canales digitales de Portalhouses.com!" );           
      
            users = {} //Reset a el usuario
            asesor = 0; //Reset al modo automatico

            resetInactivityTimer();
        })
        .catch(error => {
          console.error(error);
          client.sendMessage(message.from, 'No se encontro facturas para este id, por favor intentelo nuevamente' );

          
        });
        
              
		  
        console.log("estoy en el paso" + paso);
	}

    if(message.body === '4'&& asesor == 0) {
		
      if (fnConsultaHorarioAtencion()==1) {
      client.sendMessage(message.from, 'Hola😃, gracias por contactarse con el departamento de Cartera, nuestro horario de atención es de Lunes a Sábado de 8:00 A.M. a 6:00 P.M.' );

      users = {} //Reset a el usuario
      asesor = 0; //Reset al modo automatico

      }else{
      client.sendMessage(message.from, 'Hola😃, gracias por contactarse con el departamento de Cartera, ¿cómo podemos ayudarlo?:' );
      console.log("estoy en el paso" + paso);

      users = {} //Reset a el usuario
      asesor = 0; //Reset al modo automatico

      resetInactivityTimer();
    }
	}

    if(message.body === '5' && asesor == 0) {
    
    if (fnConsultaHorarioAtencion()==1) {
    client.sendMessage(message.from, 'Hola😃, nuestro horario de atención es de Lunes a Sábado de 8:00 A.M. a 6:00 P.M. ¡Gracias!' );

    users = {} //Reset a el usuario
    asesor = 0; //Reset al modo automatico

    }else
   {
    client.sendMessage(message.from, 'Contactar con departamento de Proyectos: https://wa.me/573108321234');

    
    users = {} //Reset a el usuario
    asesor = 0; //Reset al modo automatico

      
    }
    users = {}
    asesor = 0;
	}

    if(message.body === '6' && asesor == 0) {
		
      if (fnConsultaHorarioAtencion()==1) {
        client.sendMessage(message.from, 'Hola😃, nuestro horario de atención es de Lunes a Sábado de 8:00 A.M. a 6:00 P.M. ¡Gracias!' );

        users = {} //Reset a el usuario
        asesor = 0; //Reset al modo automatico

        }else
       {
      client.sendMessage(message.from, '🏚️ Contactar con departamento de Administración: https://wa.me/573164727856' );
       
      
        users = {} //Reset a el usuario
        asesor = 0; //Reset al modo automatico

       

      }
  
	}

    if(message.body === '7' && asesor == 0) {
		client.sendMessage(message.from, '👩🏼‍💼 Contactar con departamento Comercial: https://wa.me/573116068572' );
        const paso = "3.1";
      
        users = {} //Reset a el usuario
        asesor = 0; //Reset al modo automatico
	}

  if(message.body === '8' && asesor == 0) {
    
    if (fnConsultaHorarioAtencion()==1) {
    client.sendMessage(message.from, 'Hola😃, nuestro horario de atención es de Lunes a Sábado de 8:00 A.M. a 6:00 P.M. ¡Gracias!' );

    users = {} //Reset a el usuario
    asesor = 0; //Reset al modo automatico

    }else
   {
    client.sendMessage(message.from, '🛠️ Contactar con departamento de Proyectos: https://wa.me/573108321234');

        
    users = {} //Reset a el usuario
    asesor = 0; //Reset al modo automatico

      
    }

		
	}



  if(message.body === '9' && asesor == 0) {
		client.sendMessage(message.from, 'Encuentrenos en la Calle 12 Norte # 9N - 43 Barrio Granada: https://goo.gl/maps/xkm5nSQwJHMomdQW8' );
        const paso = "9";
        console.log("estoy en el paso" + paso);
        users = {}
        asesor = 0;
        
	}
  if(message.body >10 && message.body < 1000000  && asesor == 0) {
		client.sendMessage(message.from, 'Por favor seleccione una opción correcta' );
        const paso = "error";
        console.log("estoy en el paso" + paso);
        users = {}
        asesor = 0;
	}

  

  });




  client.initialize();
  resetInactivityTimer();