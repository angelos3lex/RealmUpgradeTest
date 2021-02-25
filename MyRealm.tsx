const uuidv4 = require('uuid/v4');
import TestDbModule from './TestDbModule';
import Realm from 'realm';
import Account, {AccountRealmObject} from './Account';
import Organization, {OrganizationRealmObject} from './Organization';
import {BaseDBObject} from './BaseDBObject';

export default class MyRealm {
  static REALM_NAME = 'my.testDb.realm';

  static dbOptions = {
    path: MyRealm.REALM_NAME,
    schema: TestDbModule,
    schemaVersion: 7,
  };

  private realm?: Realm;
  static instanceObj?: MyRealm;

  static instance() {
    if (!MyRealm.instanceObj) {
      MyRealm.instanceObj = new MyRealm();
      MyRealm.instanceObj.realm = new Realm(MyRealm.dbOptions);
    }

    return MyRealm.instanceObj;
  }

  add(obj: BaseDBObject, schema: string): void {
    if (!obj.code) {
      obj.code = uuidv4();
      console.log('no code existed for so added to it the code: ', obj.code);
    }

    MyRealm.instance().realm.write(() => {
      MyRealm.instance().realm.create(
        schema,
        obj.dbModel,
        Realm.UpdateMode.All,
      );
    });
  }

  findAllAccounts(): Account[] {
    return Array.from(
      MyRealm.instance()
        .realm.objects(AccountRealmObject.schema.name)
        .map((it) => Account.wrap(it)),
    );
  }

  findAllOrganizations(): Organization[] {
    return Array.from(
      MyRealm.instance()
        .realm.objects(OrganizationRealmObject.schema.name)
        .map((it) => Organization.wrap(it)),
    );
  }
}
