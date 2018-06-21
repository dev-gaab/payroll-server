const db = require('../db');

export default class Usuario {
    // atributos de la clase
    id: number;
    username: string;
    password: string;
    nombre: string;
    apellido: string;
    rol: string;
    estatus: string;
    // constructor
    constructor(){

        this.id = null;
        this.username = null;
        this.password = null;
        this.nombre = null;
        this.apellido = null;
        this.rol = null;
        this.estatus = null;

    }
    // Obtener todos los usuarios
    index(){

        const sql = "SELECT * FROM usuario";

        db.query(sql)
            .then( res => {
                return { data: res.rows};
            })
            .catch(err => {
                return { error: err.stack };
            });
    }
    // buscar un usuario
    find(){

        const sql = {
            text: 'SELECT * FROM usuario WHERE id=$1',
            values: [this.id]
        };

        db.query(sql)
            .then( res => {
                return { data: res.rows};
            })
            .catch(err => {
                return { error: err.stack };
            });

    }  
    // ingresar un nuevo usuario
    create(){

        const sql = {
            text: 'INSERT INTO usuario(id, username, password, nombre, apellido, rol, estatus) VALUES (default, $1, $2, $3, $4, $5, $6) ',
            values: [this.username, this.password, this.nombre, this.apellido, this.rol, this.estatus]
        };

        const resp = db.query(sql)
            .then( res => {
                return { message: "Inserción exitosa" };
            })
            .catch(err => {
                return { error: err.stack };
            })

        return resp;
    }
    // actualizar un usuario
    update(){

        const sql = {
            text: 'UPDATE usuario SET nombre=$1, apellido=$2, rol=$3',
            values: [this.nombre, this.apellido, this.rol]
        };

        const resp = db.query(sql)
            .then( res => {
                return res;
            })
            .catch(err => {
                return { error: err.stack };
            });
    }

    // habilitar usuario
    enable(){
        
        const sql = {
            text: 'UPDATE usuario SET estatus=$2 WHERE id=$1',
            values: [this.id, 'habilitado']
        };

        db.query(sql)
            .then( res => {
                return res;
            })
            .catch(err => {
                return { error: err.stack };
            });
    }

    // deshabilitar usuario
    disable(){
        
        const sql = {
            text: 'UPDATE usuario SET estatus=$2 WHERE id=$1',
            values: [this.id, 'inhabilitado']
        };

        db.query(sql)
            .then( res => {
                return res;
            })
            .catch(err => {
                return { error: err.stack };
            });
    }

    login(){
        const sql = {
            text: 'SELECT * FROM usuario WHERE username=$1 AND estatus=$2',
            values: [this.username, 'habilitado']
        };

        const resp = db.query(sql)
            .then( res => {
                return res.rows;
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

}