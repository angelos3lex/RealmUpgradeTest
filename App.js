/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Account, {AccountRealmObject} from './Account';
import MyRealm from './MyRealm';
import Organization, {OrganizationRealmObject} from './Organization';

const App = () => {
  const press = () => {
    let realm = new MyRealm();

    let organization = new Organization();
    organization.code = '1234-12345';

    let account = new Account();
    account.code = '1234-12345-1234567';
    account.organization = organization;

    realm.add(account.organization, OrganizationRealmObject.schema.name);
    console.log('Successfully added organization to Db');

    // Below line will crash if BaseRealmObject extends Realm.Object. Without the extend, it works! But then of course the Realm.Object methods are not defined
    realm.add(account, AccountRealmObject.schema.name);
    console.log('Successfully added account to Db');

    console.log('Successfully added account and organization to Db');

    let accounts = realm.findAllAccounts();
    let lastAccount = accounts[accounts.length - 1];
    console.log('Last Account\n');
    console.log(lastAccount);
    console.log("Last Account's organization field");
    console.log(lastAccount.organization);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? 'rgba(226, 106, 106, 1)'
              : 'rgba(240, 52, 52, 1)',
          },
          styles.button,
        ]}
        onPress={press}>
        <Text style={styles.buttonText}>Press me!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {paddingVertical: 12, paddingHorizontal: 20},
  buttonText: {color: 'white', fontSize: 14},
});

export default App;
