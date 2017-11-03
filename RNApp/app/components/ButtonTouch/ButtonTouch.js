import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import PropTypes from 'prop-types';

const ButtonTouch = (props) => {

  const { text, onPress, style, textStyle, onHideUnderlay, onShowUnderlay } = props;

  return (
    <TouchableHighlight onHideUnderlay={onHideUnderlay} onShowUnderlay={onShowUnderlay} style={style} onPress={onPress}>
      <Text style={textStyle}>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

ButtonTouch.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

ButtonTouch.defaultProps = {
  text: 'Button Text',
  // eslint-disable-next-line no-console
  onPress: () => console.log('Button Pressed'),
};

export default ButtonTouch;
