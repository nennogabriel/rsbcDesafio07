import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';
import { formatPrice } from '../../util/format';

class Main extends Component {
  static propTypes = {
    addToCart: PropTypes.func.isRequired,
    amount: PropTypes.shape({
      // the format should be:
      // product.id : amount
    }).isRequired,
  };

  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({
      products: data,
    });
  }

  renderProduct = ({ item }) => {
    const { addToCart, amount } = this.props;
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => addToCart(item)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>Adicionar</AddButtonText>
        </AddButton>
      </Product>
    );
  };

  render() {
    const { products } = this.state;
    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderProduct}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
