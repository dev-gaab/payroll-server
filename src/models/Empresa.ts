const db = require('../db');

interface empresa {
    rif: string;
    razon_social: string;
    direccion: string;
    riesgo_ivss: string;
    num_afiliacion_ivss: string;
    num_afiliacion_faov: string;
    num_afiliacion_inces: string;
    fecha_afiliacion_ivss: string;
};

export default class Empresa {

    id: number;
    rif: string;
    razon_social: string;
    direccion: string;
    riesgo_ivss: string;
    num_afiliacion_ivss: string;
    num_afiliacion_faov: string;
    num_afiliacion_inces: string;
    fecha_afiliacion_ivss: string;
    estatus: string;

    constructor(data?: empresa) {

        this.rif = data !== null ? data.rif : null;
        this.razon_social = data !== null ? data.razon_social : null;
        this.direccion = data !== null ? data.direccion : null;
        this.riesgo_ivss = data !== null ? data.riesgo_ivss : null;
        this.num_afiliacion_ivss = data !== null ? data.num_afiliacion_ivss : null;
        this.num_afiliacion_faov = data !== null ? data.num_afiliacion_faov : null;
        this.num_afiliacion_inces = data !== null ? data.num_afiliacion_inces : null;
        this.fecha_afiliacion_ivss = data !== null ? data.fecha_afiliacion_ivss : null;

    }

    index() {
        const sql = "SELECT * FROM empresa";

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
            text: 'SELECT * FROM empresa WHERE id=$1',
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

        const sql = {
            text: 'INSERT INTO empresa(id, rif, razon_social, direccion, riesgo_ivss, num_afiliacion_ivss, num_afiliacion_inces, num_afiliacion_faov, fecha_inscripcion_ivss, estatus) VALUES (default, $1, $2, $3, $4, $5, $6)',
            values: [this.rif, this.razon_social, this.direccion, this.riesgo_ivss, this.num_afiliacion_ivss, this.num_afiliacion_inces, this.num_afiliacion_faov, this.fecha_afiliacion_ivss, this.estatus]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Inserción exitosa" };
            })
            .catch(err => {
                return { error: err.stack };
            })

        return resp;
    }

    update() {

        const sql = {
            text: 'UPDATE empresa SET rif = $2, razon_social = $3, direccion = $4, riesgo_ivss = $5, num_afiliacion_ivss = $6, num_afiliacion_inces = $7, num_afiliacion_faov = $8, fecha_afiliacion_ivss = $9 WHERE id=$1',
            values: [this.id, this.rif, this.razon_social, this.direccion, this.riesgo_ivss, this.num_afiliacion_ivss, this.num_afiliacion_inces, this.num_afiliacion_faov, this.fecha_afiliacion_ivss]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Actualización exitosa" };
            })
            .catch(err => {
                return { error: err.stack };
            })

        return resp;
    }

    delete() {

        const sql = {
            text: 'SELECT FROM empresa WHERE id=$1',
            values: [this.id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Eliminación exitosa" };
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

    enable() {
        const sql = {
            text: 'UPDATE empresa SET estatus=$2 WHERE id=$1',
            values: [this.id, 'habilitada']
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Empresa habilitada" };
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

    disable() {
        const sql = {
            text: 'UPDATE empresa SET estatus=$2 WHERE id=$1',
            values: [this.id, 'inhabilitada']
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Empresa inhabilitada" };
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

    validateInsert() {

        const sql = {
            text: 'SELECT * FROM empresa WHERE rif=$1',
            values: [this.rif]
        };

        const resp = db.query(sql)
            .then(res => {
                if (res.rows == '') {
                    return { success: true };
                } else {
                    return { success: false };
                }
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

    validateUpdate() {

        const sql = {
            text: 'SELECT * FROM empresa WHERE rif=$1 AND id<>$2',
            values: [this.rif, this.id]
        };

        const resp = db.query(sql)
            .then(res => {
                if (res.rows == '') {
                    return { success: true };
                } else {
                    return { success: false };
                }
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }
}