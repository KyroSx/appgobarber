import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button onPress={singOut} title="sair">
        <Text>Sair</Text>
      </Button>
    </View>
  );
};

export default Dashboard;
