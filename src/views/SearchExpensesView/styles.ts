import styled from 'styled-components/native';
import palette from '../../theme/palette';

export const Container = styled.View`
  flex: 1;
  background-color: ${palette.white};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${palette.dark};
  font-weight: bold;
`;
export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconClick = styled.TouchableOpacity`
  height: 42px;
  width: 42px;
`;

export const ContainerHeader = styled.View`
  height: 40px;
  margin-left: 12px;
  margin-top: 4px;
`;

export const ButtonHeader = styled.TouchableOpacity`
  height: 42px;
  width: 30px;
`;