import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';

class TextMaskCustom extends Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
      />
    );
  }
}

export default TextMaskCustom;
