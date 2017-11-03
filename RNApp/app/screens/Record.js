import React, {Component} from 'react';
import {
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableHighlight,
 Modal } from 'react-native';
import { colors } from '../config/styles';
import Button from '../components/Button';

import moment from 'moment'

import Meteor, { createContainer } from 'react-native-meteor';

import Camera from 'react-native-camera';

import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  main: {
    fontSize: 20,
    // color: colors.headerText,
    color: colors.blueText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  btnRecord:{
    width:100,
    alignItems: 'flex-end',
  },
  camera:{
    flex:1,
    width:250,
    height:250
  },
  modal:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner:{
    flex:1,
    borderWidth:2,
    margin:'auto'
  },
  centerFlex:{
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center'
  },
  titleText:{
    fontSize:24,
    color:'#000000',
    textAlign:'center'
  },
  titleValue:{
    fontSize:26,
    color:'red',
    textAlign:'center'
  },
  btn:{
    padding:15,
    width:140
  },
  textStyle:{
    textAlign:'center',
    color:'#2196F3'
  },
  inner:{
    width:300,
    backgroundColor:'#d3d3d3',
    padding:10
  },
  btnBottom:{
    position:'absolute',
    bottom:0,
    backgroundColor:'#ffffff',
    padding:10,
    alignContent:'flex-end',
    marginBottom:30,
    minWidth:300
  },
  button:{
    width:200,
    marginLeft:20,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'center',
    padding:10
  },
  wrapBtn:{
    borderTopWidth:1,
    borderTopColor:'#d3d3d3',
    flexDirection:'row'
  }
});

class Record extends Component {

  constructor(props){
    super(props);

    this.state = {
      photo:'',
      isLoading:true,
      modalVisible:false,
      data:'',
      user:null,
      res:'sss',
      valueRecord:''
    }
  }

  // takePicture() {
  //   const options = {};
  //   //options.location = ...
  //   this.camera.capture({metadata: options})
  //     .then((data) =>{
  //       console.log(data)
  //       this.setState({photo:data})
  //     }) 
  //     .catch(err => console.error(err));
  // }

  // render(){
  
  //   return (
  //     <View style={styles.container}>
  //       <View  style={styles.camera}>
  //       <Camera
  //         ref={(cam) => {
  //           this.camera = cam;
  //         }}
  //         aspect={Camera.constants.Aspect.fill}
  //       />
  //       </View>
  //       <Button
  //         style={styles.button}
  //         text="Take Picture"
  //         onPress={() => {this.takePicture}}
  //       />
  //     </View>
  //   );
  // }; 
// react-devtools

  recordValues = () => {
    this.setState({
      modalVisible:true
    })
  }

  setValues = () => {
    let data = {
      userId: this.props.user['_id'],
      values:{
        value:this.state.valueRecord,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    }
    let _this = this;
    let res = Meteor.call('insertValue', data, (err, r) => {
    if(err) {alert('Sorry, don\'t save, plese try again later')
    }

    _this.setState({
      modalVisible:!this.state.modalVisible,
      valueRecord:''
    })
    _this.props.navigation.navigate('Home');
   });
 
  }

  setModalVisible = () => {
    this.setState({modalVisible:!this.state.modalVisible})
  }

  render(){
    const { valueRecord, modalVisible, text } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <TextInput
          keyboardType = 'numeric'
          style={{height: 40, width: 100, borderColor: 'gray',  borderWidth: 1, padding:10}}
          onChangeText={(valueRecord) => this.setState({valueRecord})}
          value={valueRecord+''}
        />
        <Button
          style={styles.button}
          textStyle={styles.textStyle}
          text="Record"
          onPress={this.recordValues}
        />
        </View>
        <Button
          style={styles.btnBottom}
          textStyle={styles.textStyle}
          text="Take Picture"
          onPress={this.takePicture}
        />
        <Modal
         visible={modalVisible}
         animationType="fade"
         transparent={true}
         style={styles.modal}
         onPress={this.setModalVisible}
         onRequestClose={() => {alert("Modal has been closed.")}}
         >
          <View style={[styles.modalInner, styles.centerFlex]}>
          <View style={styles.inner}>
            <View >
              <Text style={styles.titleText}>Record the value</Text>
              <Text style={styles.titleValue}>{valueRecord}</Text>
            </View>
            <View style={styles.wrapBtn} >
             <Button
              text={'Retake photo'}
              textStyle={styles.textStyle}
              style={styles.btn}
              onPress={this.setModalVisible} />
             <Button
             textStyle={styles.textStyle}
             text={'Yes'} style={styles.btn}
             onPress={this.setValues}
             />
            </View>
            </View>
         </View>

        </Modal>

      </View>
    );
  };

}

Record.propTypes = {
  navigation: PropTypes.object
};

export default createContainer(() => {

  return {
    getValues: Meteor.subscribe('getValues'),
    user:Meteor.user(),
    };
}, Record);
