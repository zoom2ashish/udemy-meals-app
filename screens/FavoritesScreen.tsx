import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { Routes } from '../constants/enums';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {useSelector } from 'react-redux';
import Meal from '../models/meal';
import { AppState } from '../store/app.state';
import DefaultText from '../components/DefaultText';

export interface FavoritesScreenProps {
  navigation: StackNavigationProp;
}

const FavoritesScreen = (props: FavoritesScreenProps) => {
  const displayedMeals: Meal[] = useSelector((state: AppState) => state.meals.favoriteMeals);

  if (!displayedMeals || displayedMeals.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText> No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

  const selectMealHandler = (meal: Meal, isFav: boolean) => {
    props.navigation.navigate({
      routeName: Routes.MealDetail,
      params: {
        mealId: meal.id,
        title: meal.title,
        isFavorite: isFav
      }
    });
  }

  return (
    <MealList meals={displayedMeals} onMealSelect={(meal, isFav) => selectMealHandler(meal, isFav)} />
  );
}

FavoritesScreen.navigationOptions = (navigationData: any) => ({
  headerTitle: 'Your Favorites',
  headerLeft: (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => { navigationData.navigation.toggleDrawer() }}></Item>
    </HeaderButtons>)
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FavoritesScreen;