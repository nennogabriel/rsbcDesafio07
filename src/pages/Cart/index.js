import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControlButton,
  ProductControls,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalAmount,
  TotalText,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';
import * as color from '../../styles/color';
import { formatPrice } from '../../util/format';

class Cart extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateAmountRequest: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired,
  };

  renderProduct = ({ item }) => {
    const { removeFromCart, updateAmountRequest } = this.props;
    return (
      <Product>
        <ProductInfo>
          <ProductImage source={{ uri: item.image }} />
          <ProductDetails>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>{item.priceFormatted}</ProductPrice>
          </ProductDetails>
          <ProductDelete onPress={() => removeFromCart(item.id)}>
            <Icon name="delete-forever" size={24} color={color.primary} />
          </ProductDelete>
        </ProductInfo>
        <ProductControls>
          <ProductControlButton
            onPress={() => updateAmountRequest(item.id, item.amount - 1)}
          >
            <Icon
              name="remove-circle-outline"
              size={20}
              color={color.primary}
            />
          </ProductControlButton>
          <ProductAmount value={String(item.amount)} />
          <ProductControlButton
            onPress={() => updateAmountRequest(item.id, item.amount + 1)}
          >
            <Icon name="add-circle-outline" size={20} color={color.primary} />
          </ProductControlButton>
          <ProductSubtotal>{item.subtotal}</ProductSubtotal>
        </ProductControls>
      </Product>
    );
  };

  render() {
    const { products, total } = this.props;
    return (
      <>
        {products.length ? (
          <Container>
            <Products
              data={products}
              extraData={this.props}
              keyExtractor={item => String(item.id)}
              renderItem={this.renderProduct}
            />
            <TotalContainer>
              <TotalText>TOTAL</TotalText>
              <TotalAmount>{total}</TotalAmount>
              <Order>
                <OrderText>FINALIZAR PEDIDO</OrderText>
              </Order>
            </TotalContainer>
          </Container>
        ) : (
          <EmptyContainer>
            <Icon name="remove-shopping-cart" size={64} color="#eee" />
            <EmptyText>Seu carrinho está vazio.</EmptyText>
          </EmptyContainer>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
