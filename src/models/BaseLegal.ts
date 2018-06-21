const db = require('../db');

interface asignaciones{
    
};

interface deducciones{

};

interface baseLegal {

};

export default class BaseLegal {
    id: number;
    asignaciones: object;
    deducciones: object;
    cesta_ticket: object;
    desde: string;
    hasta: string;
    estatus: string;

    constructor() {

    }

    index(empresa_id: number) {
        const sql = {
            text: "SELECT * FROM base_calculo WHERE empresa_id=$1",
            values: [empresa_id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { data: res.rows };
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

    find() {

        const sql = {
            text: 'SELECT bc.id, bc.desde FROM empresa WHERE id=$1',
            values: [this.id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { data: res.rows };
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

    create() {

    }

    update() {

    }

    updateAsignaciones() {

    }

    updateDeducciones() {

    }

    updateCestaTicket() {

    }

}