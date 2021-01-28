import React from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { askAsync } from 'expo-permissions';
export default class TransScreen extends Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }

cp = async() =>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({
    hasCameraPermissions:status==="granted",
    buttonState:'clicked',
    scanned:false,
  });
}
handleBarCodeScanned = async({type,data})=>{
  this.setState({
    scanned:true,
    scannedData:data,
    buttonState:"normal",
  });
}
  render() {
    const hCP = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const bS = this.state.buttonState;
    if(bS === "clicked" && hCP){
      return(
        <BarCodeScanner
        onBarCodeScanned = {
          scanned?undefined:this.handleBarCodeScanned
        }
        style = {StyleSheet.absoluteFillObject}
        />
      )
    }else if(bS === "normal"){
      
    
    return (
      <View style={styles.container}>
          <Image
          source = "assets/Barcode.jpg"
          />
        <Text>this.state.scanneddata</Text>
        <TouchableOpacity style = {style = styles.scanButton}

        onPress={
          this.cP
        }

        title = "Bar Code Scanner">
          <Text style = {style = styles.scanText}>Scan Bar Code</Text>
        </TouchableOpacity>
          </View>
    );
}
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
  },
  scanButton:{
    backgroundColor: '#2196F3', 
    padding: 10, 
    margin: 10,
  },
  scanText:{
    fontSize: 20,
  },
});