import { Pressable, Dimensions } from "react-native";
import palette from "../../theme/palette";
import { ButtonStyle } from "./types";
import styled from "styled-components/native";
//import { darken } from "polished";

const defineBackgroundColor = (props: ButtonStyle) => {
    if (!!props.disabled) return palette.gray;
    return !!props.backgroundColor ? props.backgroundColor : palette.primary;
  };

export const Container = styled(Pressable).attrs({
    android_ripple: {
      borderless: false,
      radius: Dimensions.get("screen").width - 32,
    },
  })<ButtonStyle>`
    height: 56px;
    padding: 0 16px;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => defineBackgroundColor(props)};
`;

export const Title = styled.Text<ButtonStyle>`
  color: ${(props) => (!!props.textColor ? props.textColor : palette.white)};
  font-size: 16px;
  font-weight: bold;
`;

