import Realm from "realm";
export interface BaseDBObject {
    code?: string;
    dbModel: Realm.Object;
}
