import { IMetaData } from "oracledb";

export function scaffoldInterface(metaData: IMetaData[]) {
    metaData.forEach((md) => {
        var def = `${md.name} : ${getType(md.dbType)};`;
        console.log(def);
    });
}

function getType(type: number | undefined) {
    switch (type) {
        case 2: return 'number';
        case 1: return 'string';
        case 12 : return 'boolean';
        case undefined : return 'undefined';
        default: return type.toString();
    }
}