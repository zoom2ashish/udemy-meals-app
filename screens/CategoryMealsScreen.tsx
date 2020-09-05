import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import { Routes } from '../constants/enums';
import { CATEGORIES } from '../data/dummy-data';
import { AppState } from '../store/app.state';
import Meal from '../models/meal';
import DefaultText from '../components/DefaultText';

export interface CategoryMealProps {
  navigation: StackNavigationProp<any, {categoryId: string}>;
}
const CategoryMealsScreen = (props: CategoryMealProps) => {
  const categoryId = props.navigation.getParam('categoryId');
  const availableMeals: Meal[] = useSelector((state: AppState) => {
    return state.meals.filteredMeals;
  });
  const displayedMeals = availableMeals.filter(meal =>  meal.categoryIds.includes(categoryId) );

  if (!displayedMeals || displayedMeals.length === 0) {
    return (
      <View style={styles.emptyContent}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
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
    })
  };

  return (
    <MealList meals={displayedMeals} onMealSelect={(meal, isFav) => selectMealHandler(meal, isFav)} />
  );
}

CategoryMealsScreen.navigationOptions = (navigationData: any) => {
  const categoryId = navigationData.navigation.getParam('categoryId');
  const currentCategory = CATEGORIES.find(category => category.id === categoryId);

  return {
    headerTitle: currentCategory?.title
  }
};

const styles = StyleSheet.create({
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMealsScreen;