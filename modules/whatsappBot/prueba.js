const fnConsultaSQL = require('./consultaSQL.js');
const fnConsultaSQLPay = require('./consultaSQLpay.js');
const fnConsultaSQLbloqueos = require('./consultaSQLbloqueos.js');
const {fnConsultaHorarioAtencion,fnFechas} = require('./funciones.js');

let horaActual = new Date();

console.log(horaActual.getHours());

fnConsultaSQLPay()
        .then(resultado => {
            resultado.forEach((elemento, indice) => {
              console.log(`Elemento ${indice + 1}: ${elemento.telefono}`);
            });
        })
        .catch(error => {
          console.error(error);
          

          
        });



/*fnConsultaSQL(34671743)
  .then(resultado => {
    console.log(resultado.resumen);
    console.log(resultado.medio1);
    console.log(resultado.medio2);
    console.log(resultado.factura);
  })
  .catch(error => {
    console.error(error);
  });

if(fnConsultaHorarioAtencion()==0){
  console.log("horario normal");
}else{
  console.log("pailable");
}
*/


/*fnConsultaSQLbloqueos(5194)
  .then(resultado => {
    console.log(resultado);
    
  })
  .catch(error => {
    console.error(error);
  });

*/
