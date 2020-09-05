import Meal from '../models/meal';

export interface MealsState {
  meals: Meal[],
  filteredMeals: Meal[],
  favoriteMeals: Meal[]
}

export interface AppState {
  meals: MealsState
};

export interface Action {
  type: string;
}