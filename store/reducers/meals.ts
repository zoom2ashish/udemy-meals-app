import { MEALS } from '../../data/dummy-data';
import { MealsState, Action } from '../app.state';
import { TOGGLE_FAVS, ToggleFavsAction, SET_FILTERS, SetFiltersAction } from '../actions/meals';
import Meal from '../../models/meal';

const initialState: MealsState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducers = (state: MealsState = initialState, action: Action): MealsState => {
  switch(action.type) {
    case TOGGLE_FAVS:
      const toggleFavsAction =<ToggleFavsAction>action;
      const existingIndex = state.favoriteMeals.findIndex(favMeal => favMeal.id === toggleFavsAction.mealId);
      const mealToAdd = state.meals.find(meal => meal.id === toggleFavsAction.mealId);
      if (existingIndex > -1) {
        const updatedMeals = [...state.favoriteMeals];
        updatedMeals.splice(existingIndex, 1);
        console.log('Removing from Favorite. index=', existingIndex, updatedMeals);
        return {
          ...state,
          favoriteMeals: updatedMeals
        }
      } else {
        if (mealToAdd) {
          console.log('Adding to Favorite');
          return {
            ...state,
            favoriteMeals: [...state.favoriteMeals, mealToAdd]
          }
        } else {
          return state
        }
      }
    case SET_FILTERS: {
      const setFiltersAction = <SetFiltersAction>action;
      const appliedFilters = setFiltersAction.filters;
      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegeterian) {
          return false;
        }
        return true;
      });
      console.log('Filters applied.' , filteredMeals);
      return {
        ...state,
        filteredMeals: filteredMeals
      };
    }
    default:
      return state;
  }
};

export default mealsReducers;