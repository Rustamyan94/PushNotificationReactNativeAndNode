import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  notificationListener,
  requestUserPermission,
} from './src/utils/NotificationServices';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TEST APP FOR PUSH NOTIFICATIONS</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
