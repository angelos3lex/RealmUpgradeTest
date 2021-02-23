import Realm from 'realm';

export default class TableA extends Realm.Object {
  code;
  firstName;

  static insertionModel = (code, firstName) => ({
    code,
    firstName,
  });

  getInfo() {
    return `Code: ${this.code} || Name: ${this.firstName}`;
  }

  static schema = {
    name: 'TableA',
    primaryKey: 'code',
    properties: {
      code: 'string',
      firstName: 'string?',
    },
  };
}
