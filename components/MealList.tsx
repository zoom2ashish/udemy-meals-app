import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import Meal from '../models/meal';
import MealItem from './MealItem';
import { AppState } from '../store/app.state';
import { useSelector } from 'react-redux';

export interface MealListProps {
  meals: Meal[];
  onMealSelect: (meal: Meal, isFav: boolean) => void
}

const MealList = (props: MealListProps) => {
  const favoriteMeals: Meal[] = useSelector((state: AppState) => state.meals.favoriteMeals);

  // Render List Item
  const renderMealItem = (itemData: ListRenderItemInfo<Meal>) => {
    const selectMealHandler = () => {
      const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id);
      props.onMealSelect(itemData.item, isFav);
    };

    return (
      <MealItem data={itemData.item} onPress={selectMealHandler} />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.meals || []}
        keyExtractor={meal => meal.id}
        renderItem={renderMealItem}
        style={styles.list}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  list: {
    width: '100%'
  }
});
export default MealList;
