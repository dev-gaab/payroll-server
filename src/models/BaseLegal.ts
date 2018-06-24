const db = require('../db');

interface IAsignaciones{
    he_diurnas: number;
    he_nocturnas: number;
    domingo_feriados: number;

    createAsignaciones();
    updateAsignaciones(id: number, data: IAsignaciones);
    disableAsignaciones(id: number);
};

interface IDeducciones{
    ivss: number;
    faov: number;
    paro_forsoso: number;

    createDeducciones();
    updateDeducciones(id: number, data: IDeducciones);
    disableDeducciones(id: number);
};

interface ICestaTicket{
    monto_ct: number;
    unidad_tributaria: number;

    createCestaTicket();
    updateCestaTicket(id: number, data: ICestaTicket);
    disableCestaTicket(id: number);
};

interface ISalarioMinimo {
    monto_salario: number;

    createSalario();
    updateSalario(id: number, data: ISalarioMinimo);
    disableSalario(id: number);
}

export default class BaseLegal implements IAsignaciones, IDeducciones, ICestaTicket, ISalarioMinimo {
    // Propiedades de la clase
    id: number;
    desde: string;
    hasta: string;
    estatus: string;
    // Inteface IAsignaciones
    he_diurnas: number;
    he_nocturnas: number;
    domingo_feriados: number;
    // Interface IDeducciones
    ivss: number;
    faov: number;
    paro_forsoso: number;
    // Interface ICestaTicket
    monto_ct: number;
    unidad_tributaria: number;
    // Interface ISalarioMinimo
    monto_salario: number;

    constructor(data?: any) {
        // asignaciones
        this.he_diurnas = data.he_diurnas !== null ? data.he_diurnas : null;
        this.he_nocturnas = data.he_nocturnas !== null ? data.he_nocturnas : null;
        this.domingo_feriados = data.domingo_feriados !== null ? data.domingo_feriados : null;
        // deducciones
        this.ivss = data.ivss !== null ? data.ivss : null;
        this.faov = data.faov !== null ? data.faov : null;
        this.paro_forsoso = data.paro_forsoso !== null ? data.paro_forsoso : null;
        // cestaticket
        this.monto_ct = data.monto_ct !== null ? data.monto_ct : null;
        this.unidad_tributaria = data.unidad_tributaria !== null ? data.unidad_tributaria : null;
        // salario
        this.monto_salario = data.monto_salario !== null ? data.monto_salario : null;
 
    }

    index(empresa_id: number) {

        const sql = {
            text: "SELECT * FROM base_legal WHERE empresa_id=$1",
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
            text: `SELECT bl.*, a.he_diurnas, a.he_nocturnas, a.domingo_feriados, d.ivss, d.faov, d.paro_forsoso, ct.cantidad, ct.unidad_tributaria, s.cantidad 
                FROM base_legal as bl 
                JOIN asignaciones as a ON bl.asignaciones_id=a.id 
                JOIN deducciones as d ON bl.deducciones_id=d.id
                JOIN cesta_ticket as ct ON bl.cesta_ticket_id=ct.id
                JOIN salario_minimo as s ON bl.salario_minimo_id=s.id
                WHERE bl.id=$1`,
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

    create( empresa_id: number, asignacion_id: number, deduccion_id: number, cesta_ticket_id: number, salario_minimo_id: number) {

         const sql = {
            text: `INSERT INTO base_legal
                (id, empresa_id, asignaciones_id, deducciones_id, cesta_ticket_id, salario_minimo_id, desde, estatus) 
                VALUES (default, $1, $2, $3, $4, $5, $6, $7)`,
            values: [empresa_id, asignacion_id, deduccion_id, cesta_ticket_id, salario_minimo_id, this.desde, 'habilitado']
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

    disable(id: number) {

        const sql = {
            text: `UPDATE base_legal SET estatus=$1 WHERE id=$2`,
            values: ['inhabilitado', id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Deshabilitado exitoso" };
            })
            .catch(err => {
                return { error: err.stack };
            })

        return resp;
    }

    createAsignaciones(){

        const sql = {
            text: 'INSERT INTO asignaciones(id, he_diurnas, he_nocturnas, domingo_feriados, estatus) VALUES (default, $1, $2, $3, $4)',
            values: [this.he_diurnas, this.he_nocturnas, this.domingo_feriados, 'habilitado']
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

    createDeducciones(){

        const sql = {
            text: 'INSERT INTO deducciones(id, ivss, faov, paro_forsoso, estatus) VALUES (default, $1, $2, $3, $4)',
            values: [this.ivss, this.faov, this.paro_forsoso, 'habilitado']
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

    createCestaTicket(){

        const sql = {
            text: 'INSERT INTO cesta_ticket(id, cantidad, unidad_tributaria, estatus) VALUES (default, $1, $2, $3)',
            values: [this.monto_ct, this.unidad_tributaria, 'habilitado']
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

    createSalario(){

        const sql = {
            text: 'INSERT INTO salario_minimo(id, cantidad, estatus) VALUES (default, $1, $2)',
            values: [this.monto_salario, 'habilitado']
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

    updateAsignaciones(id:number, data: IAsignaciones) {
        const sql = {
            text: `UPDATE asignaciones 
            SET he_diurnas=$2, he_nocturnas=$3, domingo_feriados=$4 
            WHERE id=$1`,
            values: [id, data.he_diurnas, data.he_nocturnas, data.domingo_feriados]
        };

        const resp = db.query(sql)
            .then( res => {
                return { message: "Modificación exitosa"}
            })
            .catch( err => {
                return { error: err.stack };
            });

        return resp;
    }

    updateDeducciones(id:number, data: IDeducciones) {
        const sql = {
            text: `UPDATE deducciones 
            SET ivss=$2, faov=$3, paro_forsoso=$4 
            WHERE id=$1`,
            values: [id, data.ivss, data.faov, data.paro_forsoso]
        };

        const resp = db.query(sql)
            .then( res => {
                return { message: "Modificación exitosa"}
            })
            .catch( err => {
                return { error: err.stack };
            });

        return resp;
    }

    updateCestaTicket(id: number, data: ICestaTicket) {
        const sql = {
            text: `UPDATE cesta_ticket 
            SET cantidad=$2, unidad_tributaria=$3 
            WHERE id=$1`,
            values: [id, data.monto_ct, data.unidad_tributaria]
        };

        const resp = db.query(sql)
            .then( res => {
                return { message: "Modificación exitosa"}
            })
            .catch( err => {
                return { error: err.stack };
            });

        return resp;
    }

    updateSalario(id: number, data: ISalarioMinimo){

        const sql = {
            text: `UPDATE salario_minimo 
            SET cantidad=$2 
            WHERE id=$1`,
            values: [id, data.monto_salario]
        };

        const resp = db.query(sql)
            .then( res => {
                return { message: "Modificación exitosa"}
            })
            .catch( err => {
                return { error: err.stack };
            });

        return resp;

    }

    disableAsignaciones(id: number){

        const sql = {
            text: `UPDATE asignaciones SET estatus=$1 WHERE id=$2`,
            values: ['inhabilitado', id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Deshabilitado exitoso" };
            })
            .catch(err => {
                return { error: err.stack };
            });

        return resp;
    }

    disableDeducciones(id: number){

        const sql = {
            text: `UPDATE deducciones SET estatus=$1 WHERE id=$2`,
            values: ['inhabilitado', id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Deshabilitado exitoso" };
            })
            .catch(err => {
                return { error: err.stack };
            });
            
        return resp;
    }

    disableCestaTicket(id: number){

        const sql = {
            text: `UPDATE cesta_ticket SET estatus=$1 WHERE id=$2`,
            values: ['inhabilitado', id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Deshabilitado exitoso" };
            })
            .catch(err => {
                return { error: err.stack };
            })

        return resp;

    }

    disableSalario(id: number){

        const sql = {
            text: `UPDATE salario_minimo SET estatus=$1 WHERE id=$2`,
            values: ['inhabilitado', id]
        };

        const resp = db.query(sql)
            .then(res => {
                return { message: "Deshabilitado exitoso" };
            })
            .catch(err => {
                return { error: err.stack };
            })

        return resp;
    }

}