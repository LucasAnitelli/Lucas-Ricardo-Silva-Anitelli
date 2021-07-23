import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignInView from '../views/SignInView';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName="SignInView">
      <AuthStack.Screen name="SignInView" component={SignInView} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
