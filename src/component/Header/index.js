import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ContainerSafe,
  Container,
  HomeButton,
  Logo,
  CartButton,
  CartText,
} from './styles';

function Header({ navigation, cartSize }) {
  return (
    <ContainerSafe>
      <Container>
        <HomeButton onPress={() => navigation.navigate('Main')}>
          <Logo />
        </HomeButton>
        <CartButton onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#fff" size={24} />
          <CartText>{cartSize}</CartText>
        </CartButton>
      </Container>
    </ContainerSafe>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  cartSize: PropTypes.number.isRequired,
};

export default connect(
  state => ({
    cartSize: state.cart.length,
  }),
  null
)(Header);
