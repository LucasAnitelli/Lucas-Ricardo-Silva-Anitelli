import styled from 'styled-components/native';
import {Card} from '../../theme/card';
import palette from '../../theme/palette';

export const Container = styled.View`
    background-color: ${palette.blue};
    flex: 1;
`;

export const ContainerHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 56px;
    margin-bottom: 16px;
    padding: 16px 16px 0px 16px;
`;

export const ContainerContentHeader = styled.View`
    flex-direction: row;
`;

export const ButtonHeader = styled.TouchableOpacity`
    height: 42px;
    width: 42px;
    align-items: center;
    justify-content: center;
`;

export const WelcomeUser = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${palette.white};
`;

export const ContainerAlert = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TextAlert = styled.Text`
    font-size: 20px;
    color: ${palette.white};
    font-weight: bold;
    text-align: center;
`;