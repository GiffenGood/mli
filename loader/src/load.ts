import { ICustomer } from './../../common/src/customer';
import * as oracledb from 'oracledb';
import { config } from "./dbconfig";
import { scaffoldInterface } from './metadata';
import { IConnection } from 'oracledb';

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
            if(!row || x == 10){
                stop = true;
            }
            else{
                console.log(row.C_FORMALNAME, row.C_RSN);
                udateLastSyncDate(conn,'customer','c_rsn',row.C_RSN);
                x++;
            }
        }
       // conn.commit();
        console.log(`Total Count ${x}`);        
    }
    finally {
        conn.close();
    }
}

async function udateLastSyncDate(conn : IConnection, tableName : string, id : string, rsn : number){
    var sql = `update ${tableName} set sync_date = sysdate where ${id} = :rsn`;
    var res = await conn.execute(sql,{rsn :rsn},{ autoCommit : true});
}

doIt();    