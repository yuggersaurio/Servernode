
const express = require('express');
const cleaner = express.Router();

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');



function accionRepetida() {


// Obtener la fecha actual
const fechaActual = new Date();


// Obtener el nombre del mes actual
const nombreMesActual = fechaActual.toLocaleString('es', { month: 'long' }); // 'es' para español, 'long' para obtener el nombre completo del mes
const numeroAnoActual = fechaActual.getFullYear();

// Imprimir el nombre del mes actual
console.log("Esperando cambios en la carpeta...");
const directorio = "C:\\USERS\\PORTALHOUSES\\DROPBOX\\CONTABILIDAD\\RECAUDOS\\RECAUDO\\" + numeroAnoActual + "\\" + nombreMesActual;



fs.readdir(directorio, (error, archivos) => { //Leo el directorio
  if (error) {
    console.error('Ocurrió un error al leer el directorio:', error);
    return;
  }

  archivos.forEach((archivo) => {
    const rutaArchivo = path.join(directorio, archivo);

    fs.stat(rutaArchivo, (error, stats) => {
      if (error) {
        console.error('Ocurrió un error al obtener las estadísticas del archivo:', error);
        return;
      }

      if (stats.isFile()) {
        extension = archivo.substring(archivo.length - 3)
        if(extension == "zip"){


//--descomprimimos archivo

const zip = new AdmZip(rutaArchivo);
zip.extractAllTo(directorio, /*overwrite*/true);

console.log('Archivo ZIP descomprimido exitosamente.');


//----------------------------------------------------------------

console.log(archivo);

          ///------borramos archivo compreso

          fs.unlink(rutaArchivo, (error) => {
            if (error) {
              console.error('Ocurrió un error al eliminar el archivo:', error);
              return;
            }
            console.log('El archivo se eliminó correctamente.');
          });


          ///--------------------------------



       }
      }
    });
  });
});

}

// Establecer el intervalo de tiempo en milisegundos (por ejemplo, cada 5 segundos)
var intervaloTiempo = 1800000; // 1000 ms = 1 segundo

// Ejecutar la acción repetidamente en el intervalo de tiempo especificado
var intervalo = setInterval(accionRepetida, intervaloTiempo);

module.exports = cleaner;