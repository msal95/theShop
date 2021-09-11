/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/NavigationService';
import {printLogs} from './src/utils/utils';
import DebugConfig from './src/config/DebugConfig';

const App: () => Node = () => {
  const routeNameRef = useRef(null);

  const onStateChange = async () => {
    if (__DEV__) {
      const previousRouteName = routeNameRef.current;
      const {name, params} = navigationRef.current.getCurrentRoute?.() || {};

      if (previousRouteName !== name) {
        printLogs({
          NAVIGATION: {
            PREVIOUS_SCREEN: previousRouteName,
            CURRENT_SCREEN: name,
            PARAMS: params,
          },
        });
      }
      routeNameRef.current = name;
    }
  };

  const onReady = () =>
    __DEV__
      ? (routeNameRef.current = navigationRef.current.getCurrentRoute?.()?.name)
      : {};

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="green" />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={onStateChange}
        onReady={onReady}>
        <Text>Hello World</Text>
      </NavigationContainer>
    </SafeAreaView>
  );
};

// allow reactotron overlay for fast design in dev mode
export default DebugConfig?.useReactotron ? console?.tron?.overlay(App) : App;
