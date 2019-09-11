import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Cart from './pages/Cart';
import Header from './component/Header';

import * as color from './styles/color';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Cart,
    },
    {
      // initialRouteName: 'Cart',
      defaultNavigationOptions: state => ({
        header: <Header {...state} />,
      }),
      cardStyle: {
        backgroundColor: color.background,
      },
    }
  )
);

export default Routes;
