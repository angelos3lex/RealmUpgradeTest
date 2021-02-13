export default class TableB {
  code;
  createdOn;
  updatedOn;
  localUpdatedOn;
  deleted;

  firstName;
  lastName;

  getInfo() {
    return `Code: ${this.code} || Name: ${this.firstName} || LastName: ${this.lastName}`;
  }

  static schema = {
    name: 'TableB',
    primaryKey: 'code',
    properties: {
      code: 'string',
      createdOn: 'int?',
      updatedOn: 'int?',
      localUpdatedOn: 'int?',
      deleted: 'bool?',

      firstName: 'string?',
      lastName: 'string?',
    },
  };
}
