import { Action } from '../app.state';
import { Filters } from '../../models/filters';

export const TOGGLE_FAVS = "TOGGLE_FAVS";
export type ToggleFavsAction = Action & {mealId: string};
export const toggleFavs = (id: string): ToggleFavsAction => ({
  type: TOGGLE_FAVS,
  mealId: id,
});


export const SET_FILTERS = "SET_FILTERS";
export type SetFiltersAction = Action & { filters: Filters };
export const setFilters = (filterSettings: Filters): SetFiltersAction => ({
  type: SET_FILTERS,
  filters: filterSettings,
});

