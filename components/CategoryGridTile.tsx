import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Category from '../models/category';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { PlatformTypes } from '../constants/enums';

export interface CategoryGridTileProps {
  title: string;
  color: string;
  onPress: () => void;
}

const CategoryGridTile = (props: CategoryGridTileProps) => {
  let TouchableComp: any = (Platform.OS == PlatformTypes.Android && Platform.Version >= 23) ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.container}>
      <TouchableComp
        style={{ ...styles.gridItem, backgroundColor: props.color }}
        onPress={() => props.onPress()}
      >
        <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
      </TouchableComp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    height: 150,
    alignItems: "stretch",
    borderRadius: 10,
    overflow: Platform.select({ios: 'visible', android: 'hidden' }),
    elevation: 5
  },
  gridItem: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    borderRadius: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
});

export default CategoryGridTile;