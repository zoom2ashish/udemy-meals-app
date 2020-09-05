import React, { Component, PropsWithChildren, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { ScrollView } from 'react-native-gesture-handler';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/app.state';
import Meal from '../models/meal';
import { toggleFavs } from '../store/actions/meals';

export interface MealDetailScreenProps {
  navigation: StackNavigationProp<any, {mealId: string, toggleFavorite?: Function, isFavorite?: boolean}>
}

const ListItem = (props: PropsWithChildren<any>) => {
  return <View style={styles.listItem}><DefaultText>{props.children}</DefaultText></View>
};

const MealDetailScreen = (props: MealDetailScreenProps) => {
  const { navigation } = props;
  const mealId = props.navigation.getParam('mealId');
  const availableMeals: Meal[] = useSelector((state: AppState) => state.meals.meals);
  const isFavorite = useSelector((state: AppState) => state.meals.favoriteMeals.some(meal => meal.id === mealId));

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);
  const dispatch = useDispatch();

  console.log('Rendering MealDetails Screen with isFavorite = ', isFavorite);

  const toggleFavoriteHandler = useCallback(() => {
    console.log('toggleFavorite called from header');
    dispatch(toggleFavs(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({
      toggleFavorite: toggleFavoriteHandler
    })
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({ isFavorite: isFavorite})
  }, [isFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal?.imageUrl}} style={styles.image}/>
      <View style={styles.details}>
        <DefaultText>{selectedMeal?.duration}m</DefaultText>
        <DefaultText>{selectedMeal?.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal?.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal?.ingredients.map((ingredient, index) => {
        return (
        <ListItem key={index.toString()}>{ingredient}</ListItem>
        )
      })}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal?.steps.map((step, index) => {
        return (
          <ListItem key={index.toString()}>{step}</ListItem>
        )
      })}
    </ScrollView>
  );
}

MealDetailScreen.navigationOptions =  (navigationData: any) => {
  const mealTitle = navigationData.navigation.getParam('title');
  const toggleFavorite = navigationData.navigation.getParam('toggleFavorite');
  const isFavorite = navigationData.navigation.getParam('isFavorite');
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Favorite" iconName={isFavorite ? 'ios-star': 'ios-star-outline' } onPress={toggleFavorite} />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20
  },
  listItem: {
    marginHorizontal: 20,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;