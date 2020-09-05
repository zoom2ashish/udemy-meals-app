import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { DrawerNavigatorItemsProps } from 'react-navigation-drawer/lib/typescript/src/types';
import { NavigationScreenProp } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { Filters } from '../models/filters';
import { setFilters } from '../store/actions/meals';

export interface FiltersScreenProps {
  navigation: NavigationScreenProp<any>
}

interface FilterItemProps {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const FilterSwitch = (props: FilterItemProps) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{true: Colors.primaryColor, false: 'white'}}
        value={props.value}
        onValueChange={(value) => props.onChange(value)}/>
    </View>
  );
}

const FiltersScreen = (props: FiltersScreenProps) => {
  const { navigation } = props;
  const [isGluetenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters: Filters = {
      glutenFree: isGluetenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegeterian
    };
    console.log('Dispatching action with ', appliedFilters);
    dispatch(setFilters(appliedFilters));
  }, [isGluetenFree, isVegan, isVegeterian, isLactoseFree]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <DefaultText variant='bold'>Available Filters / Restrictions</DefaultText>
      <FilterSwitch label="Glutent Free" value={isGluetenFree} onChange={setIsGlutenFree} />
      <FilterSwitch label="Lactos Free" value={isLactoseFree} onChange={setIsLactoseFree} />
      <FilterSwitch label="Vegan" value={isVegan} onChange={setIsVegan} />
      <FilterSwitch label="Vegetarian" value={isVegeterian} onChange={setIsVegeterian} />
    </View>
  );
}

FiltersScreen.navigationOptions = (navigationData: any) => ({
  headerTitle: 'Filter Meals',
  headerLeft: (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => { navigationData.navigation.toggleDrawer() }}></Item>
    </HeaderButtons>),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Save"
        iconName="ios-save"
        onPress={() => {
          const saveFilters = navigationData.navigation.getParam('save');
          saveFilters();
         }}></Item>
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15
  },
  filterContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  }
});

export default FiltersScreen;