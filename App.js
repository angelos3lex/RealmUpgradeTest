/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import MyRealm from './MyRealm';
import TableA from './TableA';

const App = () => {
  const press = () => {
    console.log('Will add first object to Db');
    let realm = new MyRealm();
    let tableA = new TableA();
    console.log('First Object to be added: ', tableA.getInfo());
    realm.addA(tableA, TableA);
    console.log('Successfully added tableA to Db');

    console.log('Creating new tabelA2 to add to the Db');
    let tableA2 = new TableA();
    realm.addA(tableA2, TableA);
    console.log('Successfully added tableA2 to Db');

    let tables = realm.findAll(TableA.schema.name);
    console.log(tables.map((it) => it.getInfo()));
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
