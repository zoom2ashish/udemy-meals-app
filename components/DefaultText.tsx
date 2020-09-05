import React, { Component, PropsWithChildren } from 'react';
import { Text, StyleSheet, StyleProp, TextProps, TextStyle } from 'react-native';
import { accessibilityProps } from 'react-native-paper/lib/typescript/src/components/MaterialCommunityIcon';

export interface DefaultTextProps extends PropsWithChildren<any> {
  style?: TextStyle;
  variant?: 'normal' | 'bold'
}

const DefaultText = (props: PropsWithChildren<DefaultTextProps> & TextProps) => {
  const providedTextStyle = props.style || {};
  const textStyle = props.variant === 'bold' ? {...styles.text, ...styles.boldText} : styles.text;
  return (
    <Text style={{...textStyle, ...providedTextStyle}} >{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  },
  boldText: {
    fontFamily: 'open-sans-bold',
    fontSize: 22
  }
});
export default DefaultText;