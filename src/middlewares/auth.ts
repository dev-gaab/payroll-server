import * as jwt from "jwt-simple";
import * as moment from "moment";
import config from "../config";

export function isAuth(req, res, next) {
	
	if (!req.headers.authorization) {
		return res.status(403).send({message: 'No tienes autorizacion'});
	}

	const token = req.headers.authorization.split(" ")[1];
	const payload = jwt.decode(token, config.SECRET_TOKEN);

	if (payload.exp <= moment().unix()) {
		return res.status(401).send({ message: 'El Token ha expirado' });
	}

	req.user = payload.sub;
	next();
}