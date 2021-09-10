/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HeadVend extends Component<{}> {


constructor(props) {
  super(props);

  this.state = {
    isLoading: false,
    identificacion:'0'  ,
    nombres:'Imposible conectar'   ,
    apellidos:'' ,
    ciudadVentas:'--' ,
    foto:'https://www.mako.guru/directorio/imagenes/asesores/sinAsesor.png' ,
    activo:this.props.activo  ,
    logo1: 'https://www.mako.guru/registro/imagenes/logo.png',
    label1:this.props.lblBloqueo,
    label2: 'Inactivo',
    color: 'rgb(25,25,25)',
    colorActivo:'rgb(236,83,83)',
    id:this.props.usuario.id,
    pass:this.props.usuario.pass,
  };
}


componentWillMount(){
    return this.getVendedor();

}

componentWillReceiveProps(){
  this.getVendedor();
}


salir(){
  AsyncStorage.clear();
  Actions.ViewLogin();
}

getVendedor(){
  this.setState({isLoading: true});
  return fetch('http://www.mako.guru/listadosApp/returnVendedor.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.id,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          

        if (responseJson.pass == this.state.pass ||  this.state.pass == 'Superadmin') {
        
        let color='rgb(25,25,25)';
        let colorAct='rgb(0,152,70)';
        let activ='Activo';
       
        switch(responseJson.ciudadVentas){
          case '1': ciudad='Sogamoso';color = 'rgb(255,159,63)';break;
          case '2': ciudad='Duitama';color = 'rgb(235,44,152)';break;
          case '3': ciudad='Tunja';color = 'rgb(34,168,216)';break;
          case '4': ciudad='Paipa';color = 'rgb(179,216,34)';break;
          case '5': ciudad='Villa de Leyva';color = 'rgb(182,121,214)';break;
          case '6': ciudad='Chiquinquira';color = 'rgb(236,83,83)';break;
        } 
        if (responseJson.activo=='0') {
           color='gray';
           colorAct='rgb(236,83,83)';
           activ='Inactivo';
        };
       this.setState({
          identificacion:responseJson.identificacion  ,
          nombres:responseJson.nombres   ,
          apellidos:responseJson.apellidos ,
          ciudadVentas:ciudad ,
          foto: 'https://www.mako.guru/directorio/imagenes/asesores/'+responseJson.foto,
          activo:responseJson.activo  ,
          label2:activ,
          color: color,
          colorActivo:colorAct,
          isLoading: false,
       })

         AsyncStorage.setItem('nombresUser', responseJson.nombres);
         AsyncStorage.setItem('apellidosUser', responseJson.apellidos);
         AsyncStorage.setItem('ciudadUser', responseJson.ciudadVentas);
         AsyncStorage.setItem('activoUser', responseJson.activo);

        }else{
          this.setState({
          ciudadVentas: ' con '+this.state.id
       })
        }
       
      })
      .catch((error) => {
        console.warn(error);
      })

   
       
}




  render() {


  
   
  
    const activoStyles={
      backgroundColor: this.state.colorActivo,
    };


    const txt2Style={
      color: this.state.color,
    };
    
    const imgStyle={
      borderColor: this.state.color,
    };

     const backColor={
      backgroundColor: this.state.color,
      
    };



    return (
 
       


      <View style={[styles.header]}>
                      <Image style={styles.fondo1} source={require('./imgs/fondo1.jpg')}/>

                <Image style={styles.logoMako} source={{ uri : this.state.logo1}}/>
                <View style={[activoStyles, styles.activo]}>
                   <Text style={[styles.txt, styles.txt4]}> {this.state.label2} </Text>

                </View>

        <View style={styles.head1}>
          <TouchableOpacity style={[styles.salir,imgStyle]}  onPress={() => this.salir()} >
            <Icon name="cached" size={25} color={this.state.color} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.image,imgStyle]} onPress={() => this.salir()} >
          <Image style={[styles.foto]} source={{ uri : this.state.foto}}/>
          </TouchableOpacity>
          <View style={styles.texts}>
            <Text numberOfLines={1} ellipsizeMode ={'tail'}  style={[styles.txt, styles.txt1]}> {this.state.nombres} {this.state.apellidos} </Text>
            <Text style={[styles.txt, styles.txt2, txt2Style]}> {this.state.ciudadVentas} </Text>
            <Text style={[styles.txt, styles.txt0]}> Asesor comercial </Text>
          </View>

        </View>
        <View >
        <View style={[styles.footHeader, backColor]}>
          <Image style={[styles.imgMakoT]} source={require('./imgs/makoTransparente.png')}/>  
          <Text style={[styles.txt, styles.txt3]}> {this.props.lblBloqueo} </Text>
        </View>

        </View>

        </View>
       


    );
  }
}


const styles = StyleSheet.create({


  header:{
    height: 130,
    flexDirection: 'column' ,


  },

fondo1:{
  
  position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
},
  head1:{
    height: 100,
    flexDirection: 'row',
    alignItems: 'center' ,    
  },

  image:{
    width: 80,
    height: 80,
    marginLeft: 10,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },

  foto:{
    height: '100%',
      resizeMode: Image.resizeMode.contain,

  },
salir:{
  height: 30,
  width: 30,
  bottom: 5,
  left: 5,
  zIndex: 10,
  borderRadius: 50,
  borderWidth: 1,
  backgroundColor: '#fff',
  overflow: 'hidden',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center' ,
},


  texts:{
    height: 100,
    flex: 1,
    paddingTop: 20,
    paddingLeft: 5,
  },

txt:{
  height: 20,
  fontSize: 15
},

txt0:{
  color: 'gray',
  fontSize: 12,
  width: 100
  
},

txt1:{
  fontWeight: 'bold' ,
  color: '#000000',
  fontSize: 18,
  marginBottom: 3,
  height: 23
},

txt2:{
  paddingLeft: 5,
  fontSize: 16,
  marginBottom: 3,
  height: 23
},

txt3:{
  color: '#000',
  
},

txt3:{
  color: '#fff',
  
},

txt4:{
  color: '#fff'
},

  footHeader:{
    
    height: 30,
    alignItems: 'center' ,
    justifyContent: 'center' ,

  },

activo:{
   height: 20,
    width: 60,
    position: 'absolute' ,
    right: 0,
    bottom: 30,
    alignItems: 'center' ,
  },

  logoMako:{
    height: 30,
    width: 90,
    position: 'absolute' ,
    right: 63,
    bottom: 30,

  },

imgMakoT:{
  width: 150,
  position: 'absolute',
  top:-80,
  left: 0,
  resizeMode: Image.resizeMode.contain,
},


});
