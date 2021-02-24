const fs = require('fs');
const path = require('path');

class Directory {
    constructor() {
            this._dir = 'docs';
            //Creo 2 variables 
            this._path = __dirname; //Cte que nos da la ubicacion donde estamos
            this.createDocsDir(); //nos permite crear la carpeta y validar si ya existe
        }
        //validamos el directorio donde creamos nuestra carpeta
    createDocsDir() {
        this._path = path.join(this._path, this._dir); //crea a partir de un string una URL completa
        if (!fs.existsSync(this._dir)) {
            fs.mkdirSync(this._dir);
        }
    }

    //esta funcion me retorna toda la URL (obtiene la ruta)
    getPath() {
        return this._path;
    }

    //con esto creo un STRING corto de la URL completa donde me encuentro
    getShortPath() {
        const paths = path.parse(this._path);
        let delimiter = '/';

        if (paths.dir.indexOf(delimiter) < 0) {
            delimiter = `\\`;
        }
        //root: ubicacion inicial de una URL
        //y path.name que es la ultima carpeta
        return `${paths.root}...${delimiter}${paths.name}`;
    }

    //creo la interface donde muestro los archivos dentro de esa carpeta
    getFilesInDir() {
        const files = fs.readdirSync(this._path);
        let n = 0;

        console.log(`
************************************
Ubicación: ${this.getShortPath()}
************************************`);

        files.forEach(file => {
            if (file != '.DS_Store') {
                console.log(`    ${file}`);
                n++; //cuantos archivos hay
            }
        });
    }
}


module.exports = Directory;