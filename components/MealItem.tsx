import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Meal from '../models/meal';
import { hide } from 'expo/build/launch/SplashScreen';
import DefaultText from './DefaultText';

export interface MealItemProps {
  data: Meal;
  onPress: () => void;
}

const MealItem = (props: MealItemProps) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onPress}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground source={{uri: props.data.imageUrl}} style={styles.bgImage}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText} numberOfLines={1}>{props.data.title}</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
            <DefaultText>{props.data.duration}m</DefaultText>
            <DefaultText>{props.data.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.data.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#e1e1e1',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%',
  },
  mealDetails: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  titleText: {
    color: 'white',
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  }
});
export default MealItem;