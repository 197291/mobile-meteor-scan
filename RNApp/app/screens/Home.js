import React, {Component} from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

import PropTypes from 'prop-types';

import Loading from '../components/Loading';

import ButtonTouch from '../components/ButtonTouch';
import Button from '../components/Button';

import { colors } from '../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = window.width - (MARGIN_HORIZONTAL * 2);

import ChartView from 'react-native-highcharts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,

  },
  title:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:15,
    paddingBottom:15
  },
  size10:{
    fontSize:10
  },
  middleLine:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderTopColor:'#808080',
    borderBottomColor:'#808080',
    borderTopWidth:1,
    borderBottomWidth:1,
    paddingBottom:5,
    paddingTop:5
  },
  bottomRow:{
    paddingTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  lastDate:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderTopColor:'#d3d3d3',
    borderBottomColor:'#d3d3d3',
    height:30,
    padding:10,
    marginTop:10
  },
  bottomBar:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    borderTopWidth:1,
    borderTopColor:'#d3d3d3',
    height:30,
    padding:5
  },
  bottomBtn:{
    height:20
  },
  textStyle:{
    color:'#d3d3d3',
    fontSize:8,
    textAlign:'center'
  },
  btnRecord:{
    backgroundColor:'#d3d3d3',
    padding:5,
    marginTop:20,
    marginBottom:20
  },
  textRecord:{
    textAlign:'center',
    color:'#2196F3',
    fontWeight:'900',
    fontSize:20
  },
    textStyle:{
    color:'#d4d4d4',
  },
  textStyled:{
   color:'#808080',
   textAlign:'right'
  },
  wrapChart:{
    marginTop:20
  }

});


class Home extends Component{


  recordData = () => {
    this.props.navigation.navigate('Record');
  }


  render() {
    const { scanValues, details, user } = this.props;
    let array = [],
        lastDate = '',
        index;

      if(scanValues && scanValues[0] && scanValues[0].values.length){
          index = scanValues[0].values.length - 1;
          lastDate = scanValues[0].values[index].date;
          array = scanValues[0].values;
      }


    let conf={
            chart: {
                type: 'spline',
                marginRight: 10,
                height:250
            },
            title: {
                text: 'Electricity Consumption'
            },
            xAxis: {
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Scan values',
                data: (function () {
                    // generate an array of random data
                    let data = [];
                   data = array.map( item => {
                      return [item.date, Number(item.value)]

                    })
                    return data;
                }())
            }]
        }

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize:10}}> Month to date usage (%hange)</Text>
          <Text>123 kWh (-15%)</Text>
        </View>
      <View style={styles.middleLine}>
        <View style={{width:210}}>
          <Text style={styles.textStyled}>
          Estimated monthly consumption</Text>
          <Text style={styles.textStyled}>Estimated monthly bill</Text>
        </View>
        <View>
          <Text style={styles.textStyled}>715 kWh</Text>
          <Text style={styles.textStyled}>123 EUR</Text>
        </View>
      </View>
        <View style={styles.bottomRow}>
          <Text style={[styles.textStyled, {width:210}]}>Carbon Footprint</Text>
          <Text style={styles.textStyled}>1234kg</Text>

        </View>

      <View style={styles.wrapChart}>
        <ChartView
        javaScriptEnabled={true}
        domStorageEnabled={true}
         style={{height:250}} config={conf}></ChartView>
       </View>
       <View style={styles.lastDate}>
         <Text style={{textAlign:'justify'}}>Last Recording</Text>
         <Text style={{color:'#d3d3d3'}}>{lastDate}</Text>
       </View>
       <View>
         <Button
          text='Record Current Data'
          style={styles.btnRecord}
          textStyle={styles.textRecord}
          onPress={this.recordData}
          />

       </View>
       <View style={styles.bottomBar}>
         <Button
         style={styles.bottomBtn}
         textStyle={styles.textStyle}
         text='Messages'/>

         <Button
          style={styles.bottomBtn}
          textStyle={styles.textStyle}
          text='Appliances' />

         <Button
          style={styles.bottomBtn}
          textStyle={styles.textStyle}
          text='Bills' />
         <Button

          style={styles.bottomBtn}
          textStyle={styles.textStyle}
          text='Usage' />
       </View>
      </View>
      )

      }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('details-list');
  const user = Meteor.user();
  const handleScan = Meteor.subscribe('getValues');

  return {
    user: Meteor.user(),
    detailsReady: handle.ready(),
    details: Meteor.collection('details').find() || [],
    scanReady:handleScan.ready(),
    scanValues: Meteor.collection('scanValues').find({userId:user._id}),
  }
}, Home);
{ returnStubValue: true }
