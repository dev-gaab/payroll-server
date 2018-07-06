import * as services from "../services";
import Usuario from "../models/Usuario";
import * as bcrypt from "bcrypt";
import * as express from "express";

const saltRounds = 12;

export default class UsuarioCtrl {
    constructor(){

    }

    async register(req: express.Request, res: express.Response){

        const user = new Usuario;
        user.username = req.body.username;
        user.nombre = req.body.nombre;
        user.apellido = req.body.apellido;
        user.rol = req.body.rol;
        user.estatus = 'habilitado';

        //encryptar la contraseña
        await bcrypt.hash(req.body.password, saltRounds)
            .then( hash => {
                user.password = hash;
             })
            .catch( err => {
                res.status(500).send( { message: "Error al hashear la contraseña." } )
            });

        const resp = await user.create();

        if (!resp) {
            res.status(500).send(resp);
        }

        res.status(200).send(resp);


    }

    async login(req: express.Request, res: express.Response){

        const user = new Usuario;
        user.username = req.body.username;

        const resp = await user.login();

        if (resp.error) {

            res.status(500).send(resp.error);
            return;
        }

        if (resp == '') {

            res.status(200).send({ error: "Error en login" });
            return;
        }

        // se comparan las contraseñas
        const pass = await bcrypt.compare(req.body.password, resp[0].password);

        // si la contraseña es correcta

        if (pass == true) {

            // creamos el token
            const token = await services.createToken(resp[0].id);

            const response: object = {
                token: token,
                user: {
                    nombre: resp[0].nombre,
                    apellido: resp[0].apellido
                },
                message: "Login Correcto"
            };

            res.status(200).send(response)

        }else{ // si la contraseña es incorrecta..

            res.status(200).send({ error: "Error en login" });
        }

    }
}
