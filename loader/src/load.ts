import { Firestore } from '@google-cloud/firestore';
import { ICustomer } from './../../common/src/customer';
import * as oracledb from 'oracledb';
import { oracleConfig, fbConfig, fbDBURL } from "./dbconfig";
import { scaffoldInterface } from './metadata';
import { IConnection } from 'oracledb';
import * as fbAdmin from "firebase-admin";

async function doIt() {
    let conn = undefined;
    try {
        let fbApp = fbAdmin.initializeApp({
            credential: fbAdmin.credential.cert(fbConfig),
            databaseURL: fbDBURL
        });

        let fbDB = fbApp.firestore();

        let conn = await oracledb.getConnection(oracleConfig);
        let res = await conn.execute("select * from customer where sync_date is null order by c_rsn",
            [],
            { outFormat: oracledb.OBJECT, resultSet: true, extendedMetaData: false });

        let stop = false;
        let x = 0;
        while (!stop && res.resultSet) {
            let row = <ICustomer>await res.resultSet.getRow();
            if (!row || x == 5000) {
                stop = true;
            }
            else {
                await addToFireBase(fbDB, 'customers', row, row.C_RSN);
                await udateLastSyncDate(conn, 'customer', 'c_rsn', row.C_RSN);
                console.log(row.C_FORMALNAME);
                x++;
            }
        }
        console.log(`Total Count ${x}`);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (conn) conn.close();
        process.exit();
    }
}

async function addToFireBase(fbDB: FirebaseFirestore.Firestore, collectionKey: string, data: any, key: number) {
    let doc = await fbDB.collection("customers").doc(key.toString());
    await doc.set(data);
}

async function udateLastSyncDate(conn: IConnection, tableName: string, id: string, rsn: number) {
    var sql = `update ${tableName} set sync_date = sysdate where ${id} = :rsn`;
    var res = await conn.execute(sql, { rsn: rsn }, { autoCommit: true });
}

doIt();