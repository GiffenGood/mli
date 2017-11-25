import { ICustomer } from './../../common/src/customer';
import * as oracledb from 'oracledb';
import { config } from "./dbconfig";
import { scaffoldInterface } from './metadata';

async function doIt() {
    let conn = await oracledb.getConnection(config);

    try {

        let res = await conn.execute("select * from customer where sync_date is null",
            [],
            { outFormat: oracledb.OBJECT, resultSet: true, extendedMetaData : false });

        let stop = false;
        let x = 0;
        while (!stop && res.resultSet) {
            let row = <ICustomer> await res.resultSet.getRow();
            if(!row || x > 1){
                stop = true;
                console.log('stop!!!');
            }
            else{
                console.log(row.C_FORMALNAME, row.C_RSN);
                x++;
            }
        }
        console.log(`Total Count ${x}!`);        
    }
    finally {
        conn.close();
    }
}

doIt();    