import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

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

class Cart extends Component {
  state = {
    products: [],
  };

  decrement = () => {
    return null;
  };

  increment = () => {
    return null;
  };

  removeFromCart = () => {
    return null;
  };

  renderProduct = ({ item }) => {
    return (
      <Product>
        <ProductInfo>
          <ProductImage source={{ uri: item.image }} />
          <ProductDetails>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>R$ {item.price}</ProductPrice>
          </ProductDetails>
          <ProductDelete onPress={() => this.removeFromCart(item.id)}>
            <Icon name="delete-forever" size={24} color={color.primary} />
          </ProductDelete>
        </ProductInfo>
        <ProductControls>
          <ProductControlButton onPress={() => this.decrement(item)}>
            <Icon
              name="remove-circle-outline"
              size={20}
              color={color.primary}
            />
          </ProductControlButton>
          <ProductAmount value={String(item.amount)} />
          <ProductControlButton onPress={() => this.increment(item)}>
            <Icon name="add-circle-outline" size={20} color={color.primary} />
          </ProductControlButton>
          <ProductSubtotal>{item.subtotal}</ProductSubtotal>
        </ProductControls>
      </Product>
    );
  };

  render() {
    const { products } = this.state;
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
              <TotalAmount>{325.52}</TotalAmount>
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

export default connect()(Cart);
