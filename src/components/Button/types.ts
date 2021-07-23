import { TouchableOpacityProps } from "react-native";

export interface ButtonStyle {
  textColor?: string;
  backgroundColor?: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface ButtonProps extends ButtonStyle , TouchableOpacityProps{
  title: string;
  handleClick: () => void;
}