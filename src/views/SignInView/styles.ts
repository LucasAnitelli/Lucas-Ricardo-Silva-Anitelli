import styled from 'styled-components/native';
import palette from '../../theme/palette';

export const Container = styled.View`
  flex: 1;
  background-color: ${palette.white};
  padding: 16px;
`;

export const ContainerLogo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
`;

export const ContainerInput = styled.View`
  margin-top: 16px;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  flex-grow: 1;
`;

export const ContainerButton = styled.View``;