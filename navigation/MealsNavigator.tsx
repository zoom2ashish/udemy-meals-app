import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import { Routes, PlatformTypes } from '../constants/enums';
import { Button, ImagePropTypes, View, Text, Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import FiltersScreen from '../screens/FiltersScreen';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.select({ [PlatformTypes.Android]: Colors.primaryColor, [PlatformTypes.iOS]: Colors.whiteColor  })
  },
  headerTintColor: Platform.select({ [PlatformTypes.Android]: Colors.whiteColor, [PlatformTypes.iOS]: Colors.primaryColor  }),
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
};

const styles = StyleSheet.create({
  tabLabelStyle: {
    fontFamily: 'open-sans-bold'
  }
});


const MealsNavigator = createStackNavigator({
  [Routes.Categories]: CategoriesScreen,
  [Routes.CategoryMeals]: {
    screen: CategoryMealsScreen
  },
  [Routes.MealDetail]: MealDetailScreen
}, {
  defaultNavigationOptions // Applies to all screens
});

const favsStackNavigator = createStackNavigator({
  [Routes.Favorites]: FavoritesScreen,
  [Routes.MealDetail]: MealDetailScreen
}, {
  defaultNavigationOptions
});

const tabsConfig = {
  [Routes.Meals]: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: any) => <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />,
      tabBarColor: Colors.primaryColor,
      tabBarLabel: Platform.OS === PlatformTypes.Android ? <Text style={{fontFamily: 'open-sans-bold', color: 'white'}}>Meals</Text> : 'Meals'
    }
  },
  [Routes.Favorites]: {
    screen: favsStackNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: any) => <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />,
      tabBarColor: Colors.accentColor,
      tabBarLabel: Platform.OS === PlatformTypes.Android ? <Text style={{fontFamily: 'open-sans-bold', color: 'white'}}>Favorites</Text> : 'Favorites'
    }
  }
};

const MealsFavTabNavigator = Platform.OS === PlatformTypes.Android ?
  createMaterialBottomTabNavigator(tabsConfig, {
    activeColor: 'white',
    shifting: true
  }) :
  createBottomTabNavigator(tabsConfig, {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: styles.tabLabelStyle
    }
  });


const FiltersStackNavigator = createStackNavigator({
  [Routes.Filters]: FiltersScreen
}, {
  navigationOptions: {
    drawerLabel: 'Filters'
  },
  defaultNavigationOptions
});

const MainNavigator = createDrawerNavigator({
  [Routes.MealsFavs]: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  [Routes.Filters]: FiltersStackNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: { fontFamily: 'open-sans-bold' }
  }
});

export default createAppContainer(MainNavigator);