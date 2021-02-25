import Realm from 'realm';

import {BaseDBObject} from './BaseDBObject';
import BaseRealmObject from './BaseRealmObject';
import Account, {AccountRealmObject} from './Account';

export default class Organization implements BaseDBObject {
  private _dbModel: OrganizationRealmObject;

  constructor(dbModel?: OrganizationRealmObject) {
    this._dbModel = dbModel ?? new OrganizationRealmObject();
  }

  static wrap(dbModel: OrganizationRealmObject): Organization {
    return new Organization(dbModel);
  }

  public getParent(): BaseDBObject | null {
    if (!this.dbModel.account) {
      return null;
    }
    let accounts = Array.from(this.dbModel.account).map((it) =>
      Account.wrap(it),
    );
    return accounts.length > 0 ? accounts[0] : null;
  }

  get dbModel(): OrganizationRealmObject {
    return this._dbModel;
  }

  get code(): string | undefined {
    return this.dbModel.code;
  }

  set code(val: string | undefined) {
    this.dbModel.code = val;
  }
}

export class OrganizationRealmObject extends BaseRealmObject {
  account?: Realm.Results<AccountRealmObject>;

  public static schema: Realm.ObjectSchema = {
    name: 'Organization',
    primaryKey: 'code',
    properties: {
      code: 'string',

      account: {
        type: 'linkingObjects',
        objectType: 'Account',
        property: 'organization',
      },
    },
  };
}
