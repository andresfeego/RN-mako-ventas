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
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
  Keyboard,
  AsyncStorage,
  Picker,
  Item
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');


export default class ViewLogin extends Component<{}> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user:'',
	  	pass:'',
      cargando: 1,
      usersList: [],
      usersMap: [],
	  };
	}

//............................DID AND WILL MOUNT METHOD .............................

componentDidMount(){
  

  this.getVendList();


} 


//............................FUNCIONES PARA generar carta presentacion  .............................



getVendList(){

    return fetch('http://www.mako.guru/listadosApp/returnVendedores.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.id
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         // console.warn('antes', responseJson);
          data=[];
     
            data= responseJson;
        
       this.setState({
          usersList: data,
          cargando: 0,
       })
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}



login(){

    if (this.state.user != '' && this.state.pass != '') {
    return fetch('http://www.mako.guru/listadosApp/loginVendedores.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      user: this.state.user,
      pass: this.state.pass
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       
       if (responseJson == 1) {
          this.faltaUser()
       } else{
          
          if (responseJson == 2) {
          	this.faltaPass();
          } else{
          	if (responseJson == 3) {
          		Keyboard.dismiss();
          		Actions.CambioPass({user: this.state.user, pass: this.state.pass});
          	} else{
          		Keyboard.dismiss();
          		Actions.homeView({user: this.state.user, pass: this.state.pass});
          	};
          };
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

	Keyboard.dismiss();

  } else{
    this.faltanDatos();
  };

}

faltanDatos(){
  Alert.alert(
  'Faltan datos !',
  'Debes ingresar el usuario y contraseña suministrados por un administrador de www.mako.guru ',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}

faltaUser(){
  Alert.alert(
  'Algo salio mal !',
  'Usuario invalido o desactivado',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

faltaPass(){
  Alert.alert(
  'Algo salio mal !',
  'Contraseña errónea ponte en contacto con un administrador Mako',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    
    let fondo = require('./imgs/fondoLogin6.jpg');
    let logoLogin = require('./imgs/logoMakoVentas.png');
      return (
       

      <View style={styles.container}> 
		
	    <Image source={fondo} style={[styles.fondo,{height: height}]}/>
  	    
        <View style={styles.viewLogoLogin}>
          <Image source={logoLogin} style={styles.logoLogin}/>
  	      <Text style={styles.txtLogo}>Mako Ventas</Text>
        </View>

        <View style={styles.formulario}>


        {this.state.usersList.length > 0?
        <Picker
          style={styles.txtFormu}
          mode="dropdown"
          selectedValue={this.state.user}
          onValueChange={(value)=>{this.setState({user: value})}}>
            
            {this.state.usersList.map((item,i) => {
              return (<Item label={item.nombres+' '+item.apellidos} value={item.identificacion} key={i}/>) //if you have a bunch of keys value pair
            })}

        </Picker>
        :null
      }



        <TextInput placeholder="Contraseña" placeholderTextColor="gray" secureTextEntry={true} onChangeText={pass => this.setState({pass})} style={styles.txtFormu}/>
        </View>

        <TouchableOpacity onPress={() => this.login()} style={[styles.footer,{ borderBottomColor: '#008DD2', borderBottomWidth: 2}]}>
        	<View style={styles.contfooter}>
	          <Text style={styles.txtfooter}>Iniciar sesión</Text>
	          <Icon name="lock-open" size={40} color={'#fff'} style={styles.footerIcon}/>
        	</View>
        </TouchableOpacity>

      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: 'red'
},

fondo:{
  alignSelf: 'center',
  position: 'absolute',
  resizeMode: Image.resizeMode.center,
},

logoLogin:{
    width: '70%',
    height: '70%',
  alignSelf: 'center',
  resizeMode: Image.resizeMode.contain,
},


formulario:{
	flex: 1,
	alignItems: 'center',
   justifyContent: 'center',
   marginTop: 15,
},

header:{
  backgroundColor: '#242B40',
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
},

footer:{
  backgroundColor: 'rgb(52, 193, 187)',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
},

txtheader:{
	textAlign: 'center',
	alignItems: 'center', 
	fontSize: 17,
	color: '#fff'
},

txtfooter:{
	textAlign: 'center',
	alignItems: 'center', 
	fontSize: 17,
	color: '#fff',
	marginRight: 15
},

txtLogo:{

	textAlign: 'center',
	alignItems: 'center', 
	fontSize: 22,
	color: '#2e3638',
	marginRight: 15,
	alignSelf: 'center',
},

txtFormu:{
	width: '80%',
  paddingLeft: 4,
  paddingBottom: 4,
  color: '#2e3638',
  backgroundColor: '#fff',
  marginBottom: 4,
  borderRadius: 4,

},

contfooter:{
	flexDirection: 'row',
	alignItems: 'center',
},

viewLogoLogin:{
flex: 1,
justifyContent: 'center' ,
},

});


/*


        

        <FlatList
          data={this.state.correos}
          renderItem={({item}) => <Text style={styles.txt3}>{item.correo}</Text>}
          keyExtractor={item => item.idcorreo}/>

        <FlatList
          data={this.state.horarios}
          renderItem={({item}) => <Text style={styles.txt3}>{item.de}</Text>}
          keyExtractor={item => item.idjornadas}/>

*/