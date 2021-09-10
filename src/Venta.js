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
  Clipboard,
  Alert,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';


export default class Venta extends Component<{}> {

  constructor(props) {
    super(props);
  
    this.state = {

      nombre: 'this.props.vent.nombre', 
      telefono: this.props.vent.telefono,
      idComercio: this.props.vent.idComercio,
      plan: this.props.vent.plan,
      estado: this.props.vent.estado,
      colorCiudad: this.props.vent.id_ciudad,
    };


  }


callNumber = (url) =>{
  if (this.state.telefono > 3) {
   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
   } else{};
}


whatsapp = (phone,wp) =>{
  if (wp == 1) {
  const url = 'whatsapp://send?text=Buen día, te contacto por  medio de www.mako.guru, quisiera...&phone=+57'+phone; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
   };
}



actDesactEmpresa(id, activo){

  if (activo == 0) {
    this.activarEmpresa(id);
  } else{
    this.desactivarEmpresa(id);
  };

}

oculMosEmpresa(id, oculto){

  if (oculto == 0) {
    this.mostrarEmpresa(id);
  } else{
    this.ocultarEmpresa(id);
  };

}



activarEmpresa( id ){
   


    return fetch('http://www.mako.guru/listadosApp/activarEmpresa.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,

      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
            let that = this;
         
          if (responseJson != 0) {
         
         }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

}


desactivarEmpresa( id ){
   


    return fetch('http://www.mako.guru/listadosApp/desactivarEmpresa.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         
          if (responseJson != 0) {

          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

}



mostrarEmpresa( id ){
   


    return fetch('http://www.mako.guru/listadosApp/mostrarEmpresa.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,

      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
            let that = this;
         
          if (responseJson != 0) {
         
         }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

}


ocultarEmpresa( id ){
   


    return fetch('http://www.mako.guru/listadosApp/ocultarEmpresa.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         
          if (responseJson != 0) {

          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

}


copiarCodigo(codigo){
  Clipboard.setString(codigo);
   Alert.alert(
  'Copiado...',
  'Se ha copiado el codigo - '+codigo+' - al portapapeles',
  [
    {text: 'ok', onPress: () => console.log('nooooo')},
    
  ],
  { cancelable: false }
)
}


  render() {
    const txt0 = 'https://www.mako.guru/directorio/logos/RNNXPG4K.png'
    const txt1 = 'https://www.mako.guru/registro/imagenes/logo.png'
    const txt2 = 'IN•PACTO PUBLICITARIO'
    const txt3 = 'Sogamoso'
    const posit = 'Asesor comercial'
    const label1 = 'Mis ventas'
    let label2 = 'Activo'



 let iconoWhat = require('./imgs/sinwicono.png');

    if (this.props.vent.wp == 1) {
        iconoWhat = require('./imgs/wicono.png');      
    };



   
    let color='lightgray';

        
       
        switch(this.state.colorCiudad){
          case '1': ciudad='Sogamoso';color = 'rgb(255,159,63)';break;
          case '2': ciudad='Duitama';color = 'rgb(235,44,152)';break;
          case '3': ciudad='Tunja';color = 'rgb(34,168,216)';break;
          case '4': ciudad='Paipa';color = 'rgb(179,216,34)';break;
          case '5': ciudad='Villa de Leyva';color = 'rgb(182,121,214)';break;
          case '6': ciudad='Chiquinquira';color = 'rgb(236,83,83)';break;
          case '7': ciudad='Iza';color = 'rgb(247,210,14)';break;
        } 

    let colortxtFecha = color
    let colorFondoFecha = color
    let colorEstado = '#fff'
      if (this.props.vent.estado == 4) {
        colorEstado = '#E1E1E1'
        colortxtFecha = color
        colorFondoFecha = color
      };

   

    
    const backEstado={
      backgroundColor: colorEstado,
      
    };


    
    
    if (this.props.vent.estado == 1 || this.props.vent.estado == 2) {
      colortxtFecha = '#fff'
      colorFondoFecha = '#EC5353'
    };

    const fecha={
      backgroundColor: colorFondoFecha,
      
    };

      const txtFecha={
        color: colortxtFecha,
    };


 let iconoActivo = 'visibility-off';
        let lblActivo = 'Desactivar';
     let colorActivo = 'gray'

        if (this.props.vent.activo == 0) {
            iconoActivo = 'visibility';          
            lblActivo = 'Activar';
            colorActivo = '#EC5353';

        };

 let iconoOculto = 'visibility-off';
     let lblOculto = 'Ocultar';
     let colorOculto = 'gray'

        if (this.props.vent.oculto == 1) {
            iconoOculto = 'visibility';          
            lblOculto = 'Mostrar';
            colorOculto = '#EC5353';
        };

    return (
       


        <View style={[styles.venta, backEstado]}>
          
          <View style={[styles.up,{borderBottomColor: color, borderBottomWidth: 2}]}>
            
            <Text numberOfLines={1} ellipsizeMode ={'tail'} style={[styles.txt0,{backgroundColor: color}]}> {this.props.vent.nombre.toUpperCase()} </Text>
            
            <View style={[styles.fecha,fecha]}>
              <Text style={[styles.txtFecha, txtFecha]}> {this.props.vent.fechaPospuesto} </Text>
            </View>

          </View>
          
          
          <View style={styles.down}>
            

            <View style={styles.izq}>
              <Text style={styles.txt2}> {this.props.gananciaPlan} </Text>
              <Text style={styles.txt3}> {'Factura= $ '+this.props.vent.total_factura} </Text>
              {this.props.vent.abono < this.props.vent.total_factura ? 
            <View >
                <Text style={styles.txt4}> {'Abono= $ '+this.props.vent.abono} </Text>
                <Text style={styles.txt4}> {'Saldo= $ '+this.props.vent.saldo} </Text>
            </View>
                : 
                null
              }
            </View>

            <View style={styles.der}>

              <TouchableOpacity onPress={()=> this.callNumber(`tel:${this.state.telefono}`)}>
                <Image style={styles.iconos2} source={require('./imgs/llamada.png')}/>
              </TouchableOpacity>
              
              {this.props.vent.plan == 5 && this.props.vent.estado == 5?
              
              <TouchableOpacity onPress={()=>    { this.copiarCodigo(this.props.vent.nombre.toUpperCase())}}>
                <Icon2 name="md-copy" size={30} color={this.state.colorCiudad} style={styles.iconos2}/>
              </TouchableOpacity>                  
                :

              <TouchableOpacity onPress={()=> this.whatsapp(this.state.telefono,this.props.vent.wp)}>
                <Image style={styles.iconos2} source={iconoWhat}/>
              </TouchableOpacity>  
              
              }
              <Image style={styles.iconos} source={this.props.iconoPlan}/>
              <Image style={styles.iconos} source={this.props.iconoEstado}/>

            </View>
          </View>

          {this.props.vent.autorizo_registro != '' ?
              <View style={styles.btnActivos}>
                  <Text style={styles.txt5}> {'Respon: '+this.props.vent.autorizo_registro} </Text>
              </View>
              
              : 
              null
          }
          <View style={styles.btnActivos}>

            <TouchableOpacity style={styles.btnActivo} onPress={()=> this.actDesactEmpresa(this.props.vent.idComercio,this.props.vent.activo)}>
                      <Icon name={iconoActivo} size={20} color={colorActivo}/>
                      <Text style={[styles.txtEliminar,{color: colorActivo}]}> {lblActivo} </Text>
                                
            </TouchableOpacity>
           

       
            <TouchableOpacity style={styles.btnOculto} onPress={()=> this.oculMosEmpresa(this.props.vent.idComercio,this.props.vent.oculto)}>
                      <Icon name={iconoOculto} size={20} color={colorOculto}/>
                      <Text style={[styles.txtEliminar,{color: colorOculto}]}> {lblOculto} </Text>
                                
            </TouchableOpacity>
      



          </View>

        </View>





 
      

    );
  }
}

const styles = StyleSheet.create({

venta:{
  backgroundColor: '#fff',
  marginTop: 10,
  flexDirection: 'column',
  elevation   : 5,
},

up:{
  flexDirection: 'row' ,
  alignItems: 'center' ,
  height: 20,

},

fecha:{
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  top: 0,
}, 


txtFecha:{
  fontSize: 11,
},

down:{
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: 5,
  justifyContent: 'center' ,
},
  
izq:{
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginHorizontal: 10,
  justifyContent: 'center',
},


der:{
  flex: 2,
  justifyContent: 'flex-end' ,
  alignItems: 'center',
  flexDirection: 'row',
},


txt0:{
  fontWeight: 'bold',
  fontSize: 13,
  color: '#fff',
  flex: 1,
  textAlign: 'center',
},

txt1:{
  fontWeight: 'bold',
  fontSize: 15,
  color: 'gray',
  textAlign: 'right',
},

txt2:{
  fontWeight: 'bold',
  fontSize: 18,
  color: '#00A0E3',
textAlign: 'right',
},

txt3:{
  fontWeight: 'bold',
  fontSize: 10,
  color: '#009846',
textAlign: 'right',
},

txt4:{
  fontWeight: 'bold',
  fontSize: 10,
  color: 'red',
textAlign: 'right',
},

txt5:{
  fontWeight: 'bold',
  fontSize: 10,
  color: 'gray',
  textAlign: 'center',
  width: '100%',

},

iconos:{
  width: 40,
  height: 40,
  margin: 5,
  marginTop: 10 ,

},

iconos2:{
  width: 30,
  height: 30,
  margin: 5,
  marginTop: 10  
},

iconoW:{
  width: 30,
  height: 30,
  borderRadius: 50,
  margin: 5,
},

btnActivos:{
  flexDirection: 'row' ,
},

btnActivo:{
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'lightgray',
  borderWidth: 0.5

},

btnOculto:{
flex: 1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
borderColor: 'lightgray',
borderWidth: 0.5

},


});
