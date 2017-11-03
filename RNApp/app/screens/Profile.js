import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { StyleSheet, Dimensions, Text, View, Image } from 'react-native';

import { colors } from '../config/styles';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { capitalize } from '../lib/string';
import headerImage from '../images/header-image.png';

import PropTypes from 'prop-types';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    width: window.width,
    height: window.height * 0.4,
  },
  body: {
    marginTop: -50,
    alignItems: 'center',
  },
  btn:{

    marginTop:30,
    backgroundColor:'#ffffff',
    padding:10,
    minWidth:200
  },
  textStyle:{
    color:'#2196F3',
    textAlign:'center',
  }
});

class Profile extends Component {
  handleSignOut = () => {
    Meteor.logout();
  }

  render() {
    const { user } = this.props;
    let email;

    if (user) {
      email = user.emails[0].address;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.header} source={headerImage} />
        <View style={styles.body}>
          <Avatar email={email} />
          <Text>{capitalize(email)}</Text>
          <Button textStyle={styles.textStyle} style={styles.btn} text="Sign Out" onPress={this.handleSignOut} />
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Profile);
