// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionTabs from './screens/TransactionTabs';
import TransactionDetails from './screens/TransactionDetails';
import BlockDetails2 from './screens/BlockDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionTabs" headerMode="none">
        <Stack.Screen name="TransactionTabs" component={TransactionTabs} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
        <Stack.Screen name="BlockDetails2" component={BlockDetails2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
