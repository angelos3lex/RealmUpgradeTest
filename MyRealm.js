const uuidv4 = require('uuid/v4')
import TestDbModule from './TestDbModule';
import Realm from 'realm';
export default class MyRealm {
  static REALM_NAME = 'my.testDb.realm';

  static dbOptions = {
    path: MyRealm.REALM_NAME,
    schema: TestDbModule,
    schemaVersion: 1,
  };

  static instanceObj;

  static instance() {
    if (!MyRealm.instanceObj) {
      MyRealm.instanceObj = new MyRealm();
      MyRealm.instanceObj.realm = new Realm(MyRealm.dbOptions);
    }

    return MyRealm.instanceObj;
  }

  add(obj, schema) {
    console.log('adding ', obj.getInfo(), ' to db');
    if (!obj.code) {
      obj.code = uuidv4();
      console.log(
        'no code existed for ',
        obj.getInfo(),
        ' so added to it the code: ',
        obj.code,
      );
    }
    MyRealm.instance().realm.write(() => {
      MyRealm.instance().realm.create(schema, obj, Realm.UpdateMode.All);
    });
  }

  findAll(schema) {
    return MyRealm.instance().realm.objects(schema);
  }
}
