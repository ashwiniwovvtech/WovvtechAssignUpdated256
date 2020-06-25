import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Newspage from './src/Newspage';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RelatedNews from './src/RelatedNews';

const MainNavigator = createStackNavigator({

  Newspage:{
    screen:Newspage,
  },
  RelatedNews:{
    screen:RelatedNews
  },

},
{
  initialRouteName:'Newspage'
}
);


const MainAppContainer = createAppContainer(MainNavigator);


export default class App extends Component {
  render()
    {
      return (
       <MainAppContainer/>
      );
    }  
 }
