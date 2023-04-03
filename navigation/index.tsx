/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { NavigationContainer, DarkTheme, Theme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LinkingConfiguration from './LinkingConfiguration';
import RootNavigator from './RootNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  // Redeclaring color scheme for using inside CustomTheme
  const colorSchemeRedeclaration = useColorScheme()

  const CustomTheme: Theme = {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: 'rgb(242, 242, 242)',
      card: Colors[colorSchemeRedeclaration].primary,
      text: Colors[colorSchemeRedeclaration].white,
      border: 'transparent',
      notification: 'rgb(255, 59, 48)',
    },
  };

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      /*  theme={colorScheme === 'dark' ? DarkTheme : CustomTheme} */
      theme={CustomTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}