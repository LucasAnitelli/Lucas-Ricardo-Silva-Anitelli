import styled from 'styled-components/native';
import palette from '../../theme/palette';
import { Card } from '../../theme/card';

export const ButtonRemove = styled.TouchableOpacity`
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  width: 45px;
`;

export const Container = styled(Card)`
    margin: 6px 16px 6px 16px;
    background-color: ${palette.white};
    flex-direction: row;
`;

export const DateClient = styled.Text`
  font-size: 16px;
  color: ${palette.dark};
  flex: 1;
`;

export const Price = styled.Text`
  font-size: 16px;
  color: ${palette.dark};
  flex: 1;
`;

export const Product = styled.Text`
  font-size: 16px;
  color: ${palette.dark}; 
`;

export const InputDescription = styled.TextInput`
font-size: 16px;
`;


