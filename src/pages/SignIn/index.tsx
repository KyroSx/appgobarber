import React from 'react';
import { Image, Text } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <Container>
        <Image source={logo} />
        <Title>Faça seu logon</Title>

        <Input name="email" icon="mail" placeholder="Email" />
        <Input name="password" icon="lock" placeholder="Senha" />

        <Button>Entrar</Button>

        <Text>Esqueci minha senha</Text>
        <Text> -- Criar conta </Text>
      </Container>
    </>
  );
};

export default SignIn;
