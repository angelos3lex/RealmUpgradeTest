export default class TableA {
  code;
  createdOn;
  updatedOn;
  localUpdatedOn;
  deleted;

  firstName;

  getInfo() {
    return `Code: ${this.code} || Name: ${this.firstName}`;
  }

  static schema = {
    name: 'TableA',
    primaryKey: 'code',
    properties: {
      code: 'string',
      createdOn: 'int?',
      updatedOn: 'int?',
      localUpdatedOn: 'int?',
      deleted: 'bool?',

      firstName: 'string?',
    },
  };
}
