import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddExpensesView from '../views/AddExpensesView';
import EditExpensesView from '../views/EditExpensesView';
import HomeListView from '../views/HomeListView';
import SearchExpensesView from '../views/SearchExpensesView';

const AppStack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <AppStack.Navigator headerMode="none" initialRouteName="HomeListView">
      <AppStack.Screen name="HomeListView" component={HomeListView} />
      <AppStack.Screen name="AddExpensesView" component={AddExpensesView} />
      <AppStack.Screen name="EditExpensesView" component={EditExpensesView} />
      <AppStack.Screen
        name="SearchExpensesView"
        component={SearchExpensesView}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
