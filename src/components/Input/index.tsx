import React from 'react';
import {View} from 'react-native';
import palette from '../../theme/palette';
import {Container, ContainerInput} from './styles';
import {InputProps} from './types';

const Input: React.FC<InputProps> = props => {
  const {placeholder, value, handleChange, label} = props;

  return (
    <>
      <Container>
        <ContainerInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
          placeholderTextColor={palette.gray}
          {...props}
        />
      </Container>
    </>
  );
};

export default Input;
