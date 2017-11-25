import { ICustomer } from './../../common/src/customer';
import * as oracledb from 'oracledb';
import { oracleConfig, firebaseConfig } from "./dbconfig";
import { scaffoldInterface } from './metadata';
import { IConnection } from 'oracledb';
import * as fb from 'firebase';
import { getFirebaseConfig } from './fbconfig';

async function doIt() {
    let conn = await oracledb.getConnection(oracleConfig);

    try {

        let fbApp = initFB();
        if(!fbApp) return;

        let res = await conn.execute("select * from customer where sync_date is null",
        [],
        { outFormat: oracledb.OBJECT, resultSet: true, extendedMetaData : false });        

        let stop = false;
        let x = 0;
        while (!stop && res.resultSet) {
            let row = <ICustomer>await res.resultSet.getRow();
            if (!row || x == 10) {
                stop = true;
            }
            else {
                await addToFireBase(fb,'customers',row,)
                udateLastSyncDate(conn, 'customer', 'c_rsn', row.C_RSN);
                x++;
            }
        }
        console.log(`Total Count ${x}`);
    }
    finally {
        conn.close();
        process.exit();
    }
}

async function initFB() {
    let fbApp = fb.initializeApp(getFirebaseConfig())
    try {
        await fb.auth().signInWithEmailAndPassword(firebaseConfig.user,firebaseConfig.password)
        console.log('login sucessful');
        return fbApp;
    }
    catch (error) {
        console.log(error);
    } 
    return undefined;  
}

async function udateLastSyncDate(conn: IConnection, tableName: string, id: string, rsn: number) {
    var sql = `update ${tableName} set sync_date = sysdate where ${id} = :rsn`;
    var res = await conn.execute(sql, { rsn: rsn }, { autoCommit: true });
}

doIt();    