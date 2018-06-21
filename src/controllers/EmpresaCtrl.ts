import Empresa from "../models/Empresa";
import * as express from "express";

export default class EmpresaCtrl {

	// obtener todas las empresas
	async index(req: express.Request, res: express.Response) {
		const empresa = new Empresa;
		const data = await empresa.index();

		if (data.error) {
			return res.status(500).send(data.error);
		}

		return res.status(200).send(data);

	}
	// obtener una sola empresa..
	async find(req: express.Request, res: express.Response) {

		const empresa = new Empresa;

		empresa.id = req.params.id;

		const data = await empresa.index();

		if (data.error) {
			return res.status(500).send(data.error);
		}

		if (data.data == '') {
			return res.status(200).send({ message: "Empresa no existe" });
		}

		return res.status(200).send(data);
	}

	// crear una empresa nueva
	async create(req: express.Request, res: express.Response) {

		const empresa = new Empresa(req.body.empresa);
		// parametros
		empresa.estatus = 'habilitada';

		// validamos que no exista la empresa
		const val = await empresa.validateInsert();

		if (val.success == false) {
			return res.send({ error: "El rif de la empresa ya existe" });
		}

		const resp = await empresa.create();

		if (resp.error) {
			return res.status(500).send(resp.error);
		}

		return res.status(200).send(resp);
	}

	// editar una empresas
	async update(req: express.Request, res: express.Response) {

		const empresa = new Empresa(req.body.empresa);
		// parametros
		empresa.id = req.params.id;

		// validamos que no exista la empresa
		const val = await empresa.validateUpdate();

		if (val.success == false) {
			return res.send({ error: "El rif de la empresa ya existe" });
		}

		const resp = await empresa.update();

		if (resp.error) {
			return res.status(500).send(resp.error);
		}

		return res.status(200).send(resp);
	}

	// eliminar una empresa
	async delete(req: express.Request, res: express.Response) {

		const empresa = new Empresa;
		// parametros
		empresa.id = req.params.id;

		const resp = await empresa.delete();


		if (resp.error) {
			return res.status(500).send(resp.error);
		}

		return res.status(200).send(resp);
	}

	// habilitar una empresa
	async enable(req: express.Request, res: express.Response) {

		const empresa = new Empresa;
		// parametros
		empresa.id = req.params.id;

		const resp = await empresa.enable();


		if (resp.error) {
			return res.status(500).send(resp.error);
		}

		return res.status(200).send(resp);
	}

	// inhabilitar una empresa
	async disable(req: express.Request, res: express.Response) {
		
		const empresa = new Empresa;
		// parametros
		empresa.id = req.params.id;

		const resp = await empresa.disable();

		if (resp.error) {
			return res.status(500).send(resp.error);
		}

		return res.status(200).send(resp);
	}
}