/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Linking,
  BackAndroid
} from 'react-native';

import Inicio from './src/Inicio.js';
import CambioPass from './src/CambioPass.js';
import ViewLogin from './src/ViewLogin.js';
import homeView from './src/homeView.js';
import detalleVenta from './src/detalleVenta.js';
import ViewCarta from './src/ViewCarta.js';
import ViewFactura from './src/ViewFactura.js';
import ViewPosponer from './src/ViewPosponer.js';
import ViewReporteEntrega from './src/ViewReporteEntrega.js';
import Slides from './src/Slides.js';
import SlidesPlanes from './src/SlidesPlanes.js';


import {Actions, Scene, Router} from 'react-native-router-flux';

export default class App extends Component<{}>{



  render() {


    return <Router>
    <Scene key="root">

      <Scene key="inicio" hideNavBar direction="vertical">
        <Scene key="Inicio" component={Inicio} hideNavBar/ >
      </Scene>

      
      <Scene key="login" hideNavBar >
        <Scene key="CambioPass" component={CambioPass} hideNavBar/ >
        <Scene key="ViewLogin" component={ViewLogin} hideNavBar/ >
      </Scene>

      <Scene key="home" >
        <Scene key="homeView" component={homeView} hideNavBar/   >
        <Scene key="detalleVenta" component={detalleVenta} hideNavBar={Platform.OS === 'android'}/>
        <Scene key="ViewCarta" component={ViewCarta} hideNavBar={Platform.OS === 'android'}/>
        <Scene key="ViewFactura" component={ViewFactura} hideNavBar={Platform.OS === 'android'}/>
        <Scene key="ViewPosponer" component={ViewPosponer} hideNavBar={Platform.OS === 'android'}/>
        <Scene key="ViewReporteEntrega" component={ViewReporteEntrega} hideNavBar={Platform.OS === 'android'}/>
        <Scene key="Slides" component={Slides} hideNavBar={Platform.OS === 'android'}/>
        <Scene key="SlidesPlanes" component={SlidesPlanes} hideNavBar={Platform.OS === 'android'}/>
      </Scene>
    </Scene>
    </Router>
  }
}


