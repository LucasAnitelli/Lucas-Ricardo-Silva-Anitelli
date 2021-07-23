import React, {useState} from 'react';
import {Alert, Image, Keyboard} from 'react-native';
import {useAuth} from '../../contexts/auth';
import LogoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Container, ContainerInput, ContainerLogo, Title} from './styles';
import palette from '../../theme/palette';

const SignInView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn, signed} = useAuth();

  const login = () => {
    try {
      setLoading(true);
      if (email === '') {
        Alert.alert('Email precisa ser preenchido');
      }
      Keyboard.dismiss();
      signIn(email);
    } catch (err) {
      console.log('erro para logar', err);
    }
    setLoading(false);
  };

  return (
    <Container>
      <ContainerLogo>
        <Image source={LogoImg} resizeMode="cover" />
        <Title>Despesas Pessoais</Title>
      </ContainerLogo>
      <ContainerInput>
        <Input
          handleChange={e => {
            setEmail(e);
          }}
          value={email}
          placeholder="seu@email.com"
        />
      </ContainerInput>
      <Button
        title="Login"
        handleClick={login}
        backgroundColor={palette.blue}
        textColor={palette.white}
        loading={loading}
        disabled={!email}
      />
    </Container>
  );
};

export default SignInView;
