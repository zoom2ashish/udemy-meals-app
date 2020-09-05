import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MealsNavigator from './navigation/MealsNavigator';
import { createStore, combineReducers } from 'redux';
import mealsReducers from './store/reducers/meals';
import { AppState } from './store/app.state';
import { Provider } from 'react-redux';

useScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const rootReducers = combineReducers<AppState>({
  meals: mealsReducers
});
const store = createStore(rootReducers);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  if (!isAppReady) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setIsAppReady(true)} />
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
});
