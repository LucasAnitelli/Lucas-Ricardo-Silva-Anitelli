import React from 'react';
import AuthNavigation from './auth.navigations';
import AppNavigation from './app.navigations';
import {useAuth} from '../contexts/auth';
import {ActivityIndicator, View} from 'react-native';
import palette from '../theme/palette';

const Navigation: React.FC = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={palette.blue} />
      </View>
    );
  }
  return signed ? <AppNavigation /> : <AuthNavigation />;
};

export default Navigation;
