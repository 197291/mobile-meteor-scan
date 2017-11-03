import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

import PropTypes from 'prop-types';

const Button = (props) => {
  const { text, onPress, style, textStyle, underlayColor } = props;
  return (
    <TouchableOpacity  style={style || styles.button} onPress={onPress}>
      <Text style={textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  text: 'Sign In',
  // eslint-disable-next-line no-console
  onPress: () => console.log('Button Pressed'),
};

export default Button;
