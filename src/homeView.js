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
  Alert,
  Clipboard,
  BackAndroid,
  navigationStore
  
} from 'react-native';

import HeadVend from './HeadVend';
import VentList from './VentList';
import SlidesPlanes from './SlidesPlanes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';


const onBackAndroid = () => {
    return false; // Return true to stay, or return false to exit the app.
};

export default class homeView extends Component<{}> {


constructor(props) {
  super(props);

  this.state = {
      id: this.props.user,
      pass: this.props.pass,
      activo: '1',
      labelVentas: '',
      colorIconos:'#fff',
      lblBloqueo:'Mis ventas',
      nombres:''   ,
      apellidos:'' ,

   };

  AsyncStorage.setItem('user', this.props.user)
  AsyncStorage.setItem('pass', this.props.pass)

}

componentWillMount(){
this.getVendedor();
}
componentWillUnmount(){

  BackAndroid.removeEventListener('hardwareBackPress', this.ok);

  
}
  




ok(){
 if (Actions.currentScene == 'homeView') {

BackAndroid.exitApp();
 }
}

handlePress(venta){
  if (this.state.activo == 1) {
Actions.Slides();
} else{
this.desactivada();
};

}


handlePress1(venta){
  if (this.state.activo == 1) {
Actions.SlidesPlanes();
} else{
this.desactivada();
};

}

handlePress3(venta){
  if (this.state.activo == 1) {
Actions.ViewCarta({idVen: this.state.id, nombresVen: this.state.nombres});
} else{
this.desactivada();
};

}


handlePress2(usuario){
Actions.ViewReporteEntrega(usuario={usuario});

}






//............................FUNCIONES PARA generar carta presentacion  .............................




getObsequio(){

if (this.state.activo == 1) {

    return fetch('http://www.mako.guru/listadosApp/generarCodigoObsequio.php',{
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
       
       if (responseJson != 0) {
          this.okObsequio(responseJson)
       } else{
          this.malObsequio()
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

  Keyboard.dismiss();
} else{
this.desactivada();
};

}

preguntaObsequio(){
  Alert.alert(
  'Generando código de obsequio...',
  'Estas seguro que deseas generar un código de obsequio?',
  [
    {text: 'No', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Si', onPress: () => this.getObsequio()},
  ],
  { cancelable: false }
)
}

okObsequio(codigo){

   Clipboard.setString(codigo);

  Alert.alert(
  'Todo bien!',
  'Se ha generado satisfactoriamente el código: - '+ codigo+' - y se ha copiado al portapapeles',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

malObsequio(){
  Alert.alert(
  'Algo salio mal !',
  'Algo no salio muy bien generando el código, informa de inmediato al administrador Mako',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


desactivada(){
  Alert.alert(
  'Desactivada  :(',
  'Esta opcion solo estara disponible para usuarios activos.',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


//................................................................................... .............................


callBrowser = (url) =>{
    if (this.state.activo == 1) {

    const Hurl = ('https://'+url); 

   Linking.canOpenURL(Hurl).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(Hurl);
   }
 }).catch(err => console.error('An error occurred', err));

   } else{
this.desactivada();
};


}


comprobarActivo(){

   return fetch('http://www.mako.guru/listadosApp/comprovarActivo.php',{
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

          switch(responseJson){



            case '1': 
                this.setState({
                  activo: '0',
                  colorIconos:'gray',
                  lblBloqueo:'Verificando la entrega de dinero al administrador',
                }) 
            break;

            case '2': 
                this.setState({
                  activo: '0',
                  colorIconos:'gray',
                  lblBloqueo:'Reportar la entrega de dinero al administrador',
                }) 
            break;

             case '3': 
                this.setState({
                  activo: '1',
                  colorIconos:'#fff',
                  lblBloqueo:'Mis Ventas',
                }) 
            break;

          }


      })
      .catch((error) => {
        console.warn(error);
      })

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
          
BackAndroid.addEventListener('hardwareBackPress', this.ok);

       
      
       this.setState({
        
          nombres:responseJson.nombres   ,
          apellidos:responseJson.apellidos ,
         
       })

       
      })
      .catch((error) => {
        console.warn(error);
      })

   
       
}



  render() {


    const vent ={

    nombre: 'Tissu creaciones',
    telefono: '3124609335',
    idComercio: '$ 20.000',
    plan: '$ 50.000',
    
    }
    const vents = Array(500).fill(vent) 

    const usuario = {
      id: this.state.id,
      pass: this.state.pass,

    }
  

    return (
      <View style={styles.container}>
        
        <HeadVend usuario={usuario} activo={this.state.activo} lblBloqueo={this.state.lblBloqueo}/>

        <View style={styles.con}>
          <Text> {this.state.labelVentas} </Text>
          <VentList usuario={usuario} activo={this.state.activo} homeFun={this}/>

        </View>
      
        <View  style={styles.footer}>
        <TouchableOpacity  onPress={() => this.callBrowser("www.mako.guru/directorio/directorio3.php?menu=1&idVendedor="+this.state.id+"&nomVend="+this.state.nombres+" "+this.state.apellidos)} style={[styles.footerIcon,{ borderBottomColor: '#FFF', borderBottomWidth: 2}]}>
          <Icon name="add-circle" size={30} color={this.state.colorIconos} style={styles.footerIcon}/>
          <Text numberOfLines={2} ellipsizeMode ={'tail'} style={[styles.texto,{color: this.state.colorIconos}]}>{`Registrar\nComercio`}</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => this.handlePress2(usuario)} style={[styles.footerIcon,{ borderBottomColor: '#009846', borderBottomWidth: 2}]}>
          <Icon name="monetization-on" size={30} color={'#fff'} style={styles.footerIcon}/>
          <Text style={styles.texto}>{`Reportar \n entregas`}</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => this.handlePress3()} style={[styles.footerIcon,{ borderBottomColor: '#008DD2', borderBottomWidth: 2}]}>
          <Icon name="insert-drive-file" size={30} color={this.state.colorIconos} style={styles.footerIcon} />
          <Text numberOfLines={2} ellipsizeMode ={'tail'} style={[styles.texto,{color: this.state.colorIconos}]}>{`Carta \n Presentacion`}</Text>
        </TouchableOpacity>


        <TouchableOpacity  onPress={() => this.handlePress()} style={[styles.footerIcon,{ borderBottomColor: '#F1C40F', borderBottomWidth: 2}]}>
          <Icon name="perm-media" size={30} color={this.state.colorIconos} style={styles.footerIcon} />
          <Text style={[styles.texto,{color: this.state.colorIconos}]}>Presentación</Text>
        </TouchableOpacity>


        <TouchableOpacity  onPress={() => this.handlePress1()} style={[styles.footerIcon,{ borderBottomColor: '#EC5353', borderBottomWidth: 2}]}>
          <Icon name="view-carousel" size={30} color={this.state.colorIconos} style={styles.footerIcon} />
          <Text style={[styles.texto,{color: this.state.colorIconos}]}>Planes</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => this.preguntaObsequio()} style={[styles.footerIcon,{ borderBottomColor: '#B679D6', borderBottomWidth: 2}]}>
          <Icon name="card-giftcard" size={30} color={this.state.colorIconos} style={styles.footerIcon} />
          <Text style={[styles.texto,{color: this.state.colorIconos}]}>Obsequio</Text>
        </TouchableOpacity>

       
        </View>


      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },

con:{
  flex: 1,
},

venta:{
  backgroundColor: '#fff',
  height: 100,
  marginTop: 10,
},

up:{
  flex: 0.8,
  flexDirection: 'row' ,
  marginHorizontal: 5,
  alignItems: 'center' ,
},

down:{
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: 5,
  justifyContent: 'center' ,
},
  
izq:{
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center' ,
},

der:{
  flex: 1,
  justifyContent: 'center' ,
  alignItems: 'flex-end',
},

txt0:{
  fontWeight: 'bold',
  fontSize: 18,
  color: '#000000',
  flex: 1,
},

txt1:{
  fontWeight: 'bold',
  fontSize: 15,
  color: 'gray',

},

txt2:{
  fontWeight: 'bold',
  fontSize: 17,
  color: '#00A0E3',
},

txt3:{
  fontWeight: 'bold',
  fontSize: 13,
  color: '#009846',
},

texto:{
  fontSize: 8,
  color: '#fff',
  textAlign: 'center',
},

iconos:{
  width: 40,
  height: 40,
  borderRadius: 50,
  margin: 5,
  marginTop: 10  
},

  footer:{
   height: 50,   
  flexDirection: 'row',
  backgroundColor: '#242B40',
  alignItems: 'center', 
},

footerIcon:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

});
       /* <TouchableOpacity  onPress={() => this.preguntaObsequio()} style={[styles.footerIcon,{ borderBottomColor: '#B679D6', borderBottomWidth: 2}]}>
          <Icon name="card-giftcard" size={30} color={this.state.colorIconos} style={styles.footerIcon}/>
          <Text style={[styles.texto,{color: this.state.colorIconos}]}>Obsequio</Text>
        </TouchableOpacity>
*/
