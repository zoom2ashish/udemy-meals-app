import React, { Component } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';

import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { Routes } from '../constants/enums';
import { CATEGORIES } from '../data/dummy-data';
import Category from '../models/category';

export interface CategoriesScreenProps {
  navigation: StackNavigationProp;
}

const CategoriesScreen = (props: CategoriesScreenProps) => {

  const renderGridItem = (itemData: ListRenderItemInfo<Category>) => {
    const gridItemClickHandler = () => {
      props.navigation.navigate({
        routeName: Routes.CategoryMeals,
        params: {
          categoryId: itemData.item.id
        }
      });
    };

    return (
      <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={gridItemClickHandler} />
    )
  }

  return (
      <FlatList
        numColumns={2}
        data={CATEGORIES}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id} />
  );
}

CategoriesScreen.navigationOptions = (navigationData: any) => ({
  headerTitle: 'Meal Categories',
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoriesScreen;