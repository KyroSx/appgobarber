import React from 'react';
import { Image } from 'react-native';

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

        <Input />
        <Input />

        <Button />
      </Container>
    </>
  );
};

export default SignIn;
