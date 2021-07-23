import styled from 'styled-components/native';
import palette from '../../theme/palette';

export const Container = styled.View`
  flex: 1;
  background-color: ${palette.white};
  padding: 16px;
`;

export const ContainerInput = styled.View``;

export const ContainerHeader = styled.View`
  height: 56px;
  margin-bottom: 16px;
  padding: 16px 16px 0px 0px;
`;

export const ButtonHeader = styled.TouchableOpacity`
  height: 42px;
  width: 42px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${palette.blue};
  font-weight: bold;
`;

export const ContainerTitle = styled.View`
  flex: 1;
  justify-content: center; 
  align-items: center;
`;