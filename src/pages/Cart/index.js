import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

function decrement() {
  return null;
}

function increment() {
  return null;
}

function removeFromCart() {
  return null;
}

function renderProduct({ item }) {
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
        <ProductControlButton onPress={() => decrement(item)}>
          <Icon name="remove-circle-outline" size={20} color={color.primary} />
        </ProductControlButton>
        <ProductAmount value={String(item.id)} />
        <ProductControlButton onPress={() => increment(item)}>
          <Icon name="add-circle-outline" size={20} color={color.primary} />
        </ProductControlButton>
        <ProductSubtotal>{item.priceFormatted}</ProductSubtotal>
      </ProductControls>
    </Product>
  );
}

renderProduct.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    priceFormatted: PropTypes.string,
  }).isRequired,
};

function Cart({ products }) {
  return (
    <>
      {products.length ? (
        <Container>
          <Products
            data={products}
            keyExtractor={item => String(item.id)}
            renderItem={renderProduct}
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

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  products: state.cart,
});

export default connect(
  mapStateToProps,
  null
)(Cart);
