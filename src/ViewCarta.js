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
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';



export default class ViewCarta extends Component<{}> {

	constructor(props) {
	  super(props);
	
	  this.state = {
      idVendedor: this.props.idVen,
      nombresVen: this.props.nombresVen,
	  	senores:'',
      correo:'',
      estadoEnvio:'',
      brochure: 0,
      radio_props : [
                {label: 'No', value: 0 },
                {label: 'Si', value: 1 }
              ],
	  };
	}

//............................DID AND WILL MOUNT METHOD .............................



//............................FUNCIONES PARA generar carta presentacion  .............................




getCarta(){

    if (this.state.senores != '' && this.state.correo != '') {
      this.setState({
        estadoEnvio:'Enviando...',
      });
    return fetch('http://www.mako.guru/listadosApp/generarCartaPresentacion.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      idVendedor: this.state.idVendedor,
      nombresVen: this.state.nombresVen,
      brochure: this.state.brochure,
      senores: this.state.senores,
      correo: this.state.correo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       
       if (responseJson == 1) {
          this.okCarta();

          this.setState({
        estadoEnvio:'Enviado.',
      });

       } else{
          this.malCarta();

          this.setState({
        estadoEnvio:'Error de envío´.',
      });

       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

	Keyboard.dismiss();

  } else{
    this.malEnvio();
  };

}

malEnvio(){
  Alert.alert(
  'Faltan datos !',
  'Debes ingresar el correo electrónico y el nombre de la persona o entidad a quien se generará la carta de presentación de www.mako.guru ',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}

okCarta(){
  Alert.alert(
  'Todo bien!',
  'Se ha generado satisfactoriamente la CARTA para '+this.state.senores,
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

malCarta(){
  Alert.alert(
  'Algo salio mal !',
  'Algo no salio muy bien generando la CARTA, informa de inmediato al administrador MAKO',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    
      return (
       

      <View style={styles.container}> 
		
		<View style={styles.header}>
		  <Text style={styles.txtheader}>Generar carta de presentacion dirigida a:</Text>
    </View>        
      <Text style={styles.txtId}>{this.state.estadoEnvio}</Text>

        <View style={styles.formulario}>
        <TextInput placeholder="Señores" placeholderTextColor="gray"  onChangeText={senores => this.setState({senores})} style={styles.txtFormu}/>
        <TextInput placeholder="Correo" placeholderTextColor="gray"  onChangeText={correo => this.setState({correo})} style={styles.txtFormu}/>
        <View style={styles.contradio}>
            <Text style={styles.txtId}>Adjuntar brochure</Text>

                <RadioForm
                  radio_props={this.state.radio_props}
                  initial={0}
                  style={styles.radioBtn}
                  formHorizontal={true}
                  onPress={(value) => {this.setState({brochure:value})}}/>
        </View>

        </View>

        <TouchableOpacity onPress={() => this.getCarta()} style={[styles.footer,{ borderBottomColor: '#008DD2', borderBottomWidth: 2}]}>
          <View style={styles.contfooter}>
            <Text style={styles.txtfooter}>Enviar</Text>
            <Icon name="send" size={40} color={'#fff'} style={styles.footerIcon}/>
          </View>
        </TouchableOpacity>






      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
},

formulario:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
},

header:{
  backgroundColor: '#242B40',
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
},

footer:{
  backgroundColor: '#242B40',
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

txtFormu:{
	width: '80%',
  paddingLeft: 4,
  paddingBottom: 4,
  color: '#008DD2',

},

contfooter:{
	flexDirection: 'row',
	alignItems: 'center',
},

radioBtn:{
marginTop: 15,
width: '40%',
justifyContent: 'center',
textAlign: 'center',
},

txtId:{
  margin: 15,
  fontSize: 15,
  fontFamily: 'CaviarDreams',
  textAlign: 'center',
},

contradio:{
  justifyContent: 'center',
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