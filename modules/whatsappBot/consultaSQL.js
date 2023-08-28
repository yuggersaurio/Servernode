const mysql = require('mysql');
const fnConsultaSQLbloqueos = require('./consultaSQLbloqueos.js');
const {fnConsultaHorarioAtencion,fnFechas} = require('./funciones.js');

let fnConsultaSQL = (tercero) => {

  
//Informacion para medios de pago  
//número random para links

    // Genera un número aleatorio entre 20 y 99

  // Obtiene un número decimal entre 0 y 1 (excluido)
  const randomDecimal = Math.random();

  // Escala el número para que esté en el rango entre 0 y 79
  const scaledNumber = randomDecimal * 80;

  // Desplaza el número para que esté en el rango entre 20 y 99
  const shiftedNumber = scaledNumber + 20;

  // Redondea el número para obtener un valor entero
  const numeroAleatorio = "10099"+ Math.floor(shiftedNumber)+ "00";






/*
// Obtener la fecha actual
let fecha = new Date();

// Obtener los componentes de la fecha
let year = fecha.getFullYear(); // Año de cuatro dígitos
let month = fecha.getMonth() + 1; // Mes (0-11)
let day = fecha.getDate(); // Día del mes

// Formatear los componentes con ceros iniciales si es necesario
if (month < 10) {
  month = '0' + month;
}
if (day < 10) {
  day = '0' + day;
}
*/

// Generar la fecha en el formato deseado

let resultadoFecha = fnFechas();
let fechaFormateada = resultadoFecha.fechaFormateada;
let fechaFormateadaMesActualSQL = resultadoFecha.fechaFormateadaMesActualSQL;



///------------ 

    return new Promise((resolve, reject) => {

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',       // Cambia la dirección si tu base de datos no se encuentra en localhost
    user: 'root',
    password: '',
    database: 'whatsappbot',
  connectTimeout: 30000 // Tiempo de espera de 30 segundos
});

// Realizar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Ocurrió un error al conectar con la base de datos:', err);
    connection.end();
    return;
  }

  console.log('Conexión exitosa a la base de datos.');

  // Consulta a la tabla
  const consulta = 'SELECT * FROM facturas_tayrona WHERE Tercero = '+ '"'+tercero+'" and fechafac=' + '"' + fechaFormateadaMesActualSQL + '"';

  // Ejecutar la consulta
  connection.query(consulta, (error, filas) => {
    if (error) {
      console.error('Ocurrió un error al ejecutar la consulta:', error);
      connection.end();
      return;
    }

    if (filas.length === 0) {
      let mediosReturn = { resumen: "No hay factura relacionada a este número de identificación, Si necesita más informacion puede comunicarse al 602 667 0600 ó digite la opción 4️⃣ para comunicarse con el departamento de cartera." } 
      connection.end();
      resolve(mediosReturn);
    } else {

    // Mostrar los resultados
    console.log('Resultados de la consulta:');
    
    console.log(filas);
    const resultadoValorFacturado = filas[0].total;
    const resultadoContrato = filas[0].Contrato;
    const resultadoNombre = (filas[0].razon).replace(/ +/g, "+");
    const resultadoDocumento = filas[0].Tercero;
    const resultadoNroFactura =  filas[0].Nrofactura;
   
    setTimeout(function() {

        // Valores iniciales
      
        let valorInicial = resultadoValorFacturado;
        let intereses = 0;
        let prejuridico = 0;
        let reintegroTransaccion = 0;
        let total = 0;

        
        // imrpimo valor facturado
         console.log('Valor facturado: '+ parseInt(valorInicial).toLocaleString('es-CO', { style: 'currency', currency: 'COP'}));    

        // Obtener la fecha actual
        let fechaActual = new Date();
        
        // Obtener el último día del mes actual
        let ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();
        
        // Calcular los días transcurridos en el mes actual
        let diasTranscurridos = fechaActual.getDate();
        
        //Calcular dias en mora
        let diasMora = diasTranscurridos - 5; if(diasMora<0 ){diasMora=0; }
       
        
        // Calcular los intereses y agrego reintegro transaccion
        if(diasMora>=1 ){ 
    
        intereses = (valorInicial * 0.0323) / ultimoDiaMes * diasMora;
        
        reintegroTransaccion = 10900;
                     
      
        }
        
        //calcular el prejuridico
        if(diasTranscurridos>=15){
        
        
        prejuridico  = valorInicial * 0.15
        
                
        }
        
        
               
        //Calcular el total a pagar
        total = parseInt(valorInicial) + parseInt(intereses) + parseInt(prejuridico) + parseInt(reintegroTransaccion);
        //--

        //imprimir resultados en consola
        console.log("dias en mora : " + diasMora); 
        console.log("Intereses acumulados: " + intereses.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}));
        console.log("Prejuridico: " + prejuridico.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}));
        console.log("Reintegro transaccion: " + reintegroTransaccion.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}));
        //--

            

        //VERIFICAMOS SI EL CTO ESTA BLOQUEADO

        let bloquear = fnConsultaSQLbloqueos(resultadoContrato)
        .then(resultadoBloqueo => {
         
           bloquear = resultadoBloqueo;
           console.log("cto estado: " + bloquear);
        })
        .catch(error => {
          console.error(error);
        });


        //----------------------------------------------------------------

        setTimeout(function() {
          let mediosReturn = "";
     
          if(bloquear===1){

          mediosReturn = {resumen: "🛑 Contrato bloqueado", 
                          medio1: "🚫 Pago en línea inhabilitado", 
                          medio2: "🚫 Cupón de pago inhabilitado", 
                          factura: "✳️ Por favor comuniquese con el departamento de cartera para más información." };
            
          }else {

          mediosReturn = { 

            resumen :
            "✅ ¡Medios de pago listos!"
            + "\n "
            + "\n Usuario: " + filas[0].razon
            + "\n Contrato: "+ resultadoContrato
            + '\n Valor facturado: '+ parseInt(valorInicial).toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) 
            + "\n dias en mora : " + diasMora 
            + "\n Intereses acumulados: " + intereses.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) 
            + "\n Prejuridico: " + prejuridico.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) 
            + "\n Reintegro transaccion: " + reintegroTransaccion.toLocaleString('es-CO', { style: 'currency', currency: 'COP'}) 
            + "\n Valor total:" + total.toLocaleString('es-CO', { style: 'currency', currency: 'COP'})
            + "\n ",

            medio1 : 

            "📱 Para pagos en línea: http://www.portalhouses.com/pages/usuarios/popup_pagos_wp.php?valor="+ Math.round(total)+ "&contrato="+numeroAleatorio+resultadoContrato+"&nombreComprador="+resultadoNombre+"&documentoComprador="+resultadoDocumento+"&correoinquilino=&fechaGeneracion="+fechaFormateada,
     

            medio2 :

   
            "📄 Para pagos con cupón de código de barras:  http://www.portalhouses.com/pages/usuarios/cuponlaunchx.php?nombreComprador="+resultadoNombre+ "&valor="+Math.round(total) +"&fecha_cuponlimite="+ fechaFormateada + "&fecha_cupon=" + fechaFormateada + "&cto=" + resultadoContrato + " Debe ser impreso en dispositivo laser",

            factura :

   
            "🧾 Consulte aquí su factura: https://edeb.tayronasoftwareapp.com/view/files/805010508/FAC-FAC-"+resultadoNroFactura + ".PDF"
            

     
     };
    }

     resolve (mediosReturn)
    }, 3000);
     
      // Cerrar la conexión a la base de datos
        connection.end();
        }, 2000);

      }


    //----------------------------------------------------------------



 
  });
});
});
connection.end();
}



module.exports = fnConsultaSQL;