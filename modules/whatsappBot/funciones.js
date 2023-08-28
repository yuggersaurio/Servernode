//Verificamos horario de atención//------------------------------------------------------------------------------

let fnConsultaHorarioAtencion = () => {

const hoy = new Date();
const diaDeSemana = hoy.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
const horaActual = hoy.getHours();
let resultadoHorario = 0;

    if (diaDeSemana <= 6 && (horaActual < 8 || horaActual >= 18)) {
         resultadoHorario = 1
         
              
        }else if (diaDeSemana == 7) {
          resultadoHorario = 1
          
               
         }
        return(resultadoHorario);
}


//Verificamos fechas//------------------------------------------------------------------------------

let fnFechas = () => {
    // Obtener la fecha actual
    let fecha = new Date();
    
    // Obtener los componentes de la fecha
    let year = fecha.getFullYear(); // Año de cuatro dígitos
    let month = fecha.getMonth() + 1; // Mes (0-11)
    let day = fecha.getDate(); // Día del mes
    if(day<=5){day="5";} // Si son los primeros 5 días del mes el cupon y el link tienen vigencia hasta el 5 con el mismo valor
    
    // Formatear los componentes con ceros iniciales si es necesario
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    
    // Generar la fecha en el formato deseado
    //let fechaFormateada = year + month + day;
    //let fechaFormateadaMesActualSQL = 1 + "/"+month+"/"+year //Compara la fecha actual con la fecha de la factura para saber si es el mismo mes
    let retornoFecha = {
        fechaFormateada: year + month + day,
        fechaFormateadaMesActualSQL :  1 + "/"+month+"/"+year //Compara la fecha actual con la fecha de la factura para saber si es el mismo mes
    
    
    }
    
    return(retornoFecha);
    
    ///---------

//------------------------------------------------------------------------------
}

let fnHoraActual = () =>{
  let horario = new Date();
  let hora = horario.getHours();
return hora;
}



module.exports = {fnConsultaHorarioAtencion,fnFechas, fnHoraActual};