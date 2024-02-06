import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Transactions from './Transaction';
import Blocks from './Blocks';

const Tab = createMaterialTopTabNavigator();

const TransactionTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Blocks" component={Blocks} />
    </Tab.Navigator>
  );
};

export default TransactionTabs;