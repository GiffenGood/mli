import { ICustomer } from './../../common/src/customer';
import * as oracledb from 'oracledb';
import { oracleConfig, firebaseConfig } from "./dbconfig";
import { scaffoldInterface } from './metadata';
import { IConnection } from 'oracledb';
import * as firebase from 'firebase';
import { getFirebaseConfig } from './fbconfig';

async function doIt() {
    let conn = await oracledb.getConnection(oracleConfig);

    try {

        let fbApp = await initFB();
        if(!fbApp) return;
        let fbDB = firebase.firestore();

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
                await addToFireBase(fbApp,'customers',row, row.C_RSN);
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

async function addToFireBase(fbApp : firebase.firestore.Firestore, collectionKey : string, data : any, key : number){

}

async function initFB() {
    let fbApp = firebase.initializeApp(getFirebaseConfig())
    try {
        await firebase.auth().signInWithEmailAndPassword(firebaseConfig.user,firebaseConfig.password)
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