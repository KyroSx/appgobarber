import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 60px;
  width: 100%;

  background: #ff9000;
  border-radius: 10px;
  border: 0;

  margin-top: 8px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  font-weight: bold;
  color: #312e38;
`;
