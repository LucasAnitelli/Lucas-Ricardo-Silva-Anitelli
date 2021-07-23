import styled from 'styled-components/native';
import palette from '../../theme/palette';

export const Container = styled.View`
  height: 46px;
  padding: 0px 4px;
  margin-top: 0px;
  margin-bottom: 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${palette.blue};
`;

export const ContainerInput = styled.TextInput`
  color: ${palette.dark};
  font-size: 16px;
  flex-grow: 1;
`;
