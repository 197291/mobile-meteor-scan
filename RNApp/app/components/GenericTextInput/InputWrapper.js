import React from 'react';
import { View } from 'react-native';
import styles from './styles';

import PropTypes from 'prop-types';

const InputWrapper = (props) => {
  return (
    <View style={styles.inputWrapper}>
      {props.children}
    </View>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.array,
};

export default InputWrapper;
