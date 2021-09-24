import Realm from 'realm';

import {BaseDBObject} from './BaseDBObject';
import Organization, {OrganizationRealmObject} from './Organization';
import BaseRealmObject from './BaseRealmObject';
const uuidv4 = require('uuid/v4');

export default class Account implements BaseDBObject {
  private _organization?: Organization;

  private _dbModel: AccountRealmObject;

  constructor(dbModel?: AccountRealmObject) {
    this._dbModel = dbModel ?? {} as AccountRealmObject;
  }

  static wrap(dbModel: AccountRealmObject): Account {
    return new Account(dbModel);
  }

  get dbModel(): AccountRealmObject {
    return this._dbModel;
  }

  get code(): string | undefined {
    return this.dbModel.code;
  }

  set code(val: string | undefined) {
    this.dbModel.code = val;
  }

  get organization(): Organization | undefined {
    if (!this._organization) {
      this._organization = this.dbModel.organization
        ? Organization.wrap(this.dbModel.organization)
        : undefined;
    }
    return this._organization;
  }

  set organization(val: Organization | undefined) {
    this._organization = val;
    this.dbModel.organization = val?.dbModel;
  }

  getParent(): BaseDBObject | null {
    return null;
  }
}

export class AccountRealmObject extends BaseRealmObject {
  organization?: OrganizationRealmObject;

  public static schema: Realm.ObjectSchema = {
    name: 'Account',
    primaryKey: 'code',
    properties: {
      code: 'string',
      organization: 'Organization?',
    },
  };
}
