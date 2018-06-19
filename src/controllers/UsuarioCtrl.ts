import * as services from "../services";

export default class UsuarioCtrl {
    constructor(){

    }

    async register(){

    }

    async login(req, res){

    	// crear un token..
    	const resp = await services.createToken();
    	console.log(resp);
    	res.send(resp);
    }
}