import * as oracledb from 'oracledb';
import { config } from "./dbconfig";

async function doIt() {
    let conn = await oracledb.getConnection(config);

    try {

        let res = await conn.execute("select * from customer", [], { outFormat: oracledb.OBJECT });

        if (!res.rows) {
            console.log("no rows")
        }
        else {
            for (let i = 0; i < res.rows.length; i++) { console.log(res.rows[i].C_FORMALNAME); }
        }
    }
    finally {
        conn.close();
    }
}

doIt();    