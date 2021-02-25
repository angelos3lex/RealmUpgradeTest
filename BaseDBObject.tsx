import BaseRealmObject from "./BaseRealmObject";
export interface BaseDBObject {
    code?: string;
    dbModel: BaseRealmObject;
}
