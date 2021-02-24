const fs = require('fs');
const os = require('os');

class Documents {
    constructor(dir) {
        //variables de mi clase
        this._content = ''; //string
        this._isSaved = false;
        this._filename = ''; //guardo el nombre del archivo
        this._dir = dir; // ubicación
    }
    exists(name) {
        return fs.existsSync(`${this._dir}/${name}`);
    }
    append(text) {
        //EOL significa fin de linea
        this._content += os.EOL + text;
        this._isSaved = false;
    }
    saveas(name) {
        fs.writeFileSync(`${this._dir}/${name}`, this._content);
        this._isSaved = true;
        this._filename = name;
    }
    save() {
        fs.writeFileSync(`${this._dir}/${this._filename}`, this._content);
        this._isSaved = true;
        this._filename = this._filename;
    }
    getContent() {
        return this._content;
    }
    hasName() {
        if (this._filename != '') {
            return true;
        } else {
            return false;
        }
    }
    getName() {
        return this._filename;
    }
    isSaved() {
        return this._isSaved;
    }
    open(name) {
        this._content = fs.readFileSync(`${this._dir}/${name}`, 'UTF-8');
        this._filename = name;
        //esta abierto pero no esta modificado
        this._isSaved = true;
        return this._content;
    }
}

module.exports = Documents;