import React, { useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../service/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

interface SingupFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: SingupFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O Nome é obrigátorio'),
          email: Yup.string()
            .required('O email é obrigátorio')
            .email('Digite um email valido'),
          password: Yup.string().min(6, 'No minímo 6 digitos'),
        });
        await schema.validate(data, { abortEarly: false });

        await api.post('users', data);

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso');

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert('Erro', 'Erro na autenticação');
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logo} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar!
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
