import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  ContainerSafe,
  Container,
  HomeButton,
  Logo,
  CartButton,
  CartText,
} from './styles';

export default function Header({ navigation }) {
  return (
    <ContainerSafe>
      <Container>
        <HomeButton onPress={() => navigation.navigate('Main')}>
          <Logo />
        </HomeButton>
        <CartButton onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#fff" size={24} />
          <CartText>{0}</CartText>
        </CartButton>
      </Container>
    </ContainerSafe>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
