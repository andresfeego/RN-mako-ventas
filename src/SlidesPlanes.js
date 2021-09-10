import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
 import {Actions} from 'react-native-router-flux';
import {Image} from 'react-native';
const styles = StyleSheet.create({
  image: {
    width: 320,
      position: 'absolute',
    top: -45,
    resizeMode: Image.resizeMode.contain,

  },

    image2: {
    height: 320,
    position: 'absolute',
    top: 85,
    resizeMode: Image.resizeMode.contain,

  },

    image1: {
    height: 240,
    position: 'absolute',
    top: 85,
    resizeMode: Image.resizeMode.contain,

  },

   image3: {
     height: 450,
     width: 450,
     overflow: 'visible' ,
    resizeMode: Image.resizeMode.contain,

  },

  titulo: {
    color: 'rgba(34, 34, 34, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    top: 5,
    alignSelf: 'center' ,
  },


   text: {
    color: 'rgba(34, 34, 34, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center' ,
  },

  blanco: {
    color: '#727271',
},

});
 
const slides = [


    {
    key: 'planes',
    title: 'Nuestros planes',
    text: 'Tenemos para que escojas',
    image: require('./imgs/slides/planes.png'),
    imageStyle: styles.image2,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#fff',
  },

      {
    key: 'basico',
    image: require('./imgs/slides/basico.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#fff',
  },

      {
    key: 'bronce',
    image: require('./imgs/slides/bronce.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#fff',
  },

      {
    key: 'plata',
    image: require('./imgs/slides/plata.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#fff',
  },

      {
    key: 'oro',
    image: require('./imgs/slides/oro.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#fff',
  },




];
 
export default class App extends React.Component {
  _onDone = () => {
    Actions.pop();
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}/>
    );
  }
}