import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export interface CustomHeaderButtonProps extends HeaderButtonProps {

}
const CustomHeaderButton = (props: CustomHeaderButtonProps) => {
  return (
    <HeaderButton {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.select({android: 'white', ios: Colors.primaryColor })}
      />
  );
}

const styles = StyleSheet.create({

});

export default CustomHeaderButton;