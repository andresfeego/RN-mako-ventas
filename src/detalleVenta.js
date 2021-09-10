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
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Telefonos from './Telefonos.js';
import Mails from './Mails.js';
import Horarios from './Horarios.js';
import VChorasDomi from './VChorasDomi.js';
import {Actions} from 'react-native-router-flux';


export default class detralleVenta extends Component<{}> {


//.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);

     this.state = {
      refreshing: false,
      orden: '',
      fechaRegistro: '',
      activo: '',
      codigo: this.props.venta.idComercio,
      nombre: '',
      descripcion: '',
      direccion: '',
      VChoras: '',
      domicilio: '',
      costo_domicilio: '',
      pagina_web: '',
      url_logo: '',
      categoria: '',
      palabras_clave: '',
      ubicacion_maps: '',
      visto: '',
      listado: '',
      cantidad_de_votos: '',
      numero_de_votantes: '',
      tipo_comercio: '',
      vip: '',
      afiliacion_vip: '',
      lat: '',
      lng: '',
      colorCiudad: '',
      barrio: '',
      ciudad: '',
      idCiudad: '',
      correos:[],
      horarios:[],
      telefonos:[],

      };

     
  }

//.................................METODOS LLAMADAS Y WHATSAPP........................


callBrowser = (url) =>{
    const Hurl = ('https://'+url); 

   Linking.canOpenURL(Hurl).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(Hurl);
   }
 }).catch(err => console.error('An error occurred', err));
}


whatsapp = (phone) =>{
  const url = 'whatsapp://send?text=Buen día, te contacto por medio de www.mako.guru, quisiera...&phone=+57'+phone; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}

//............................DID AND WILL MOUNT METHOD .............................

componentDidMount(){

  this.getEmpresa();
  this.getCorreos();
  this.getHorarios();
  this.getTelefonos();
  this.getCiudad();
}


//............................FUNCIONES PARA ARMADO DE EMPRESA COMPLETA .............................


getEmpresa(){

    return fetch('http://www.mako.guru/listadosApp/empresaXcodigo.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
            orden: responseJson.orden,
            fechaRegistro: responseJson.fechaRegistro,
            activo: responseJson.activo,
            codigo: responseJson.codigo,
            nombre: responseJson.nombre,
            descripcion: responseJson.descripcion,
            direccion: responseJson.direccion,
            VChoras: responseJson.vc_horas,
            domicilio: responseJson.domicilio,
            costo_domicilio: responseJson.costo_domicilio,
            pagina_web: responseJson.pagina_web,
            url_logo: responseJson.url_logo,
            categoria: responseJson.categoria,
            palabras_clave: responseJson.palabras_clave,
            ubicacion_maps: responseJson.ubicacion_maps,
            visto: responseJson.visto,
            listado: responseJson.listado,
            cantidad_de_votos: responseJson.cantidad_de_votos,
            numero_de_votantes: responseJson.numero_de_votantes,
            tipo_comercio: responseJson.tipo_comercio,
            vip: responseJson.vip,
            afiliacion_vip: responseJson.afiliacion_vip,
            lat: responseJson.lat,
            lng: responseJson.lng,
 
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getCiudad(){

    return fetch('http://www.mako.guru/listadosApp/barriociudadXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
          colorCiudad: responseJson.color,
          barrio: responseJson.nombreBarrio,
          ciudad: responseJson.nombre,
          idCiudad: responseJson.id_ciudad,
 
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getHorarios(){

    return fetch('http://www.mako.guru/listadosApp/horariosXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         
       
       this.setState({
            horarios: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getTelefonos(){

    return fetch('http://www.mako.guru/listadosApp/telefonosXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
            telefonos: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getCorreos(){

    return fetch('http://www.mako.guru/listadosApp/correosXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
            correos: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}





_onRefesh(){
  this.setState({
    refreshing: true,
  });

 
      
  this.comprobarActivo().then((id) => {
     this.getVVentas().then(() =>{
    this.setState({
      refreshing:false,
    })
  })
  })
  
 
}



parseTipoHorario(tipoHorario){
   let labelHorario = '';
  switch(item.tipoHorario){

    case 1:  labelHorario = 'Lunes a Viernes';

    break;

    case 2: labelHorario = 'Sábados';

    break;

    case 3: labelHorario = 'Lunes a sábados';

    break;

    case 4: labelHorario = 'Domingos y festivos';

    break;

    case 5: labelHorario = 'Lunes a domingo';

    break;

    case 6: labelHorario = 'Lunes festivos';

    break;

    case 7:labelHorario = 'Lunes a jueves'; 

    break;

    case 8: labelHorario = 'viernes y sábados';

    break;

    case 9: labelHorario = 'Viernes, Sábados y Domingos';

    break;

  }

  return labelHorario;
}



renderRow(item) {

    return (
      <View>
        <View>
          <Text>{this.parseTipoHorario(item.tipoHorario)}</Text>
        </View>
        <View>
          <Text>{item.de}</Text>
          <Text>{item.a}</Text>
        </View>
      </View>
    )


};

preguntaFactura(){
  Alert.alert(
  'Generando factura...',
  'Estas seguro que deseas generar la factura para este comerciante ?',
  [
    {text: 'No', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Si', onPress: () => this.getFactura()},
  ],
  { cancelable: false }
)
}

preguntaPago(){
  Alert.alert(
  'Generando Pago...',
  'Estas seguro que deseas generar el pago para este comerciante ?',
  [
    {text: 'No', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Si', onPress: () => this.getPago()},
  ],
  { cancelable: false }
)
}

preguntaPosponer(){
  Alert.alert(
  'Posponer Pago...',
  'Estas seguro que deseas posponer el pago para este comerciante ?',
  [
    {text: 'No', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Si', onPress: () => this.handlePress2(this.props.venta)},
  ],
  { cancelable: false }
)
}

okFactura(){
  Alert.alert(
  'Todo bien!',
  'Se ha generado satisfactoriamente la FACTURA código '+this.state.codigo,
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

malFactura(){
  Alert.alert(
  'Algo salio mal !',
  'Algo no salio muy bien generando la FACTURA, informa de inmediato al administrador MAKO',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

getFactura(){

    return fetch('http://www.mako.guru/listadosApp/generaFactura.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       
       if (responseJson == 1) {
          this.okFactura()
       } else{
          this.malFactura()
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getPago(){

    return fetch('http://www.mako.guru/listadosApp/generarPago.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.props.venta.idVenta,
      idComercio: this.props.venta.idComercio
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
               console.warn(responseJson);

       if (responseJson == 1) {
          this.okPago()
       } else{
          this.malPago()
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

okPago(){
  Alert.alert(
  'Todo bien!',
  'Se ha generado satisfactoriamente la PAGO para '+this.state.nombre,
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


malPago(){
  Alert.alert(
  'Algo salio mal !',
  'Algo no salio muy bien generando la PAGO, informa de inmediato al administrador MAKO',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}





handlePress(venta,direccion,color){
Actions.ViewFactura({venta,direccion,color});

}

handlePress2(venta){
Actions.ViewPosponer({venta});

}


//............................FUNCIONES PARA RENDER .............................


  render() {
    const txt0 = 'https://www.mako.guru/directorio/logos/RNNXPG4K.png'
    const txt1 = 'https://www.mako.guru/registro/imagenes/logo.png'
    const txt2 = 'IN•PACTO PUBLICITARIO'
    const txt3 = 'Sogamoso'
    const posit = 'Asesor comercial'
    const label1 = 'Mis ventas'
    let label2 = 'Activo'

      const {nombre, telefono, idComercio, plan, estado} =this.props.venta


    let fondoCiudad = require('./imgs/fondoheader0.png');

    switch(this.state.idCiudad){
      case '1':  fondoCiudad = require('./imgs/fondoheader1.png');
                 
      break;

      case '2':  fondoCiudad = require('./imgs/fondoheader2.png');
                
      break;

      case '3':  fondoCiudad = require('./imgs/fondoheader3.png');
                 
      break;

      case '4':  fondoCiudad = require('./imgs/fondoheader4.png');
               
      break;

      case '5':  fondoCiudad = require('./imgs/fondoheader5.png');
                 
      break;

    }


    let pagina = this.state.pagina_web;
    let newPagina = this.state.pagina_web;
    let iconoweb = 'ios-globe-outline';

    const palabra = 'facebook.';
    const palabra1 = 'fb.';
      if (!pagina.indexOf(palabra) || !pagina.indexOf(palabra1)) {
        newPagina= 'Ver Perfil'
        iconoweb= 'logo-facebook'
      };

    const urllogo = 'https://www.mako.guru/directorio/'+this.state.url_logo;
    
   

     const backColor={
      backgroundColor: this.state.colorCiudad,
      
    };

    const borBottColor={
      borderBottomColor: this.state.colorCiudad,
      borderBottomWidth: 1,
    };



    return (
       

      <View style={styles.container}> 
        <ScrollView style={styles.scrollcontnido}> 

          <View style={[styles.header,backColor]}>
                <Image style={[styles.fondoHeader]} source={fondoCiudad}/>
                <Image style={[styles.imgMakoT]} source={require('./imgs/makoTransparente.png')}/>
                <Image style={[styles.image]} source={{ uri : urllogo}}/>
                <Text style={styles.nombre}> {this.state.nombre} </Text>


          </View>

          <View style={styles.contenido}>
            <Text style={styles.descrip}> {this.state.descripcion} </Text>


            <View style={[styles.cajainfo,borBottColor]}>
              
              <View style={styles.iconos}>
                <Icon name="place" size={50} color={this.state.colorCiudad}/>
              </View>

              <View style={styles.info}>
                <Text style={styles.txtinfo}> {this.state.direccion} </Text>
                <Text style={styles.txtinfo}> {[this.state.barrio ,' - ' ,this.state.ciudad]} </Text>
              </View>

            </View>



            <View style={[styles.cajainfolist,borBottColor]}>
              
              <View style={styles.iconos}>
                <Icon name="phone" size={50} color={this.state.colorCiudad}/>
              </View>

              <View style={styles.info}>
               
                <FlatList
                style={styles.telef}
                  data={this.state.telefonos}
                  renderItem={({item}) => <Telefonos telefono={item}/>}
                  keyExtractor={item => item.id_telefono}/>

              </View>


            </View>

            <View style={[styles.cajainfolist,borBottColor]}>
              
              <View style={styles.iconos}>
                <Icon2 name="ios-mail" size={50} color={this.state.colorCiudad}/>
              </View>

              <View style={styles.info}>
               
                <FlatList
                  data={this.state.correos}
                  renderItem={({item}) => <Mails mail={item}/>}
                  keyExtractor={item => item.idcorreo}/>

              </View>


            </View>



            <View style={[styles.cajainfo,borBottColor]}>
              
              <View style={styles.iconos}>
                <Icon2 name={''+iconoweb} size={50} color={this.state.colorCiudad}/>
              </View>

              <TouchableOpacity style={styles.info} onPress={()=> this.callBrowser(pagina)}>
                <Text style={styles.txtinfo}> {newPagina} </Text>
              </TouchableOpacity>

            </View>




             <View style={[styles.cajainfolist,borBottColor]}>
              
              <View style={styles.iconos}>
                <Icon2 name="ios-time" size={50} color={this.state.colorCiudad}/>
              </View>

              <View style={styles.info}>
               
               <FlatList
                  data={this.state.horarios}
                  renderItem={({item}) => <Horarios horario={item} color={this.state.colorCiudad}/>}
                  keyExtractor={item => item.idjornadas}/>


                  

              </View>


            </View>

                  
            <VChorasDomi domicilio={this.state.domicilio} costo={this.state.costo_domicilio} vchoras={this.state.VChoras} color={this.state.colorCiudad}/>

            <Text style={[styles.txtciudad,backColor]}> {this.state.ciudad+ ' - '+ this.state.codigo} </Text>

          </View>

        </ScrollView>


        <View style={[styles.footer]}>
        <TouchableOpacity  onPress={()=> this.preguntaPago()} style={[styles.footerIcon,{ borderBottomColor: '#009846', borderBottomWidth: 2}]}>
          <Icon name="monetization-on" size={30} color={'#fff'} style={styles.footerIcon}/>
          <Text style={styles.texto}>Reportar Pago</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => this.handlePress(this.props.venta,this.state.direccion,this.state.colorCiudad)} style={[styles.footerIcon,{ borderBottomColor: '#008DD2', borderBottomWidth: 2}]}>
          <Icon name="receipt" size={30} color={'#fff'} style={styles.footerIcon}/>
          <Text style={styles.texto}>Generar factura</Text>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={() => this.preguntaPosponer()} style={[styles.footerIcon,{ borderBottomColor: '#EC5353', borderBottomWidth: 2}]}>
          <Icon name="update" size={30} color={'#fff'} style={styles.footerIcon}/>
          <Text style={styles.texto}>Posponer pago</Text>
        </TouchableOpacity>

        </View>


      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
},

scrollcontnido:{
  flex:1,
  flexDirection: 'column',
},

header:{
  flex: 1,
  height: 170,
  backgroundColor: '#000',
  justifyContent: 'flex-end',
  alignItems: 'center', 
  elevation: 10

},

imgMakoT:{
  width: '150%',
  height: '100%',
  position: 'absolute',
  top: -10,
  right: -250,
  resizeMode: Image.resizeMode.contain,
},

fondoHeader:{
  width: '100%',
  position: 'absolute',
  top: '-110%',
  left: 0,
  resizeMode: Image.resizeMode.contain,
},

image:{
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    marginHorizontal: 30,
    borderColor: '#1C252A',
    borderWidth: 3,
  },

nombre:{
  color: '#fff',
   fontWeight: 'bold',
  fontSize: 17,
  textAlign: 'center',
  marginHorizontal: 5,
  marginVertical: 10
},

descrip:{
  color: '#5B5B5B',
  fontSize: 14,
  textAlign: 'center',
  paddingHorizontal: 5,
  paddingVertical: 5,
  backgroundColor: '#C5C6C6',
  elevation: 5
}, 

contenido:{
  flex: 1,

},

cajainfo:{
  flex: 1,
  flexDirection: 'row',
  paddingVertical: 20,

},

cajainfolist:{
  flex: 1,
  flexDirection: 'row',
  paddingRight: 0,

},


iconos:{
  width: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
},

info:{
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
},

txtinfo:{
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  textAlign: 'right',
  paddingRight: 20,
   fontSize: 16,

},

texto:{
  fontSize: 10,
  color: '#fff',
},

txtciudad:{
  backgroundColor: '#333',
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#fff',
},

telef:{
  width: '90%',
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
  textAlign: 'center',
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