import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function Cart() {
  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  const renderProduct = useCallback(
    ({ item }) => {
      return (
        <Product>
          <ProductInfo>
            <ProductImage source={{ uri: item.image }} />
            <ProductDetails>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
            </ProductDetails>
            <ProductDelete
              onPress={() => dispatch(CartActions.removeFromCart(item.id))}
            >
              <Icon name="delete-forever" size={24} color={color.primary} />
            </ProductDelete>
          </ProductInfo>
          <ProductControls>
            <ProductControlButton
              onPress={() =>
                dispatch(
                  CartActions.updateAmountRequest(item.id, item.amount - 1)
                )
              }
            >
              <Icon
                name="remove-circle-outline"
                size={20}
                color={color.primary}
              />
            </ProductControlButton>
            <ProductAmount value={String(item.amount)} />
            <ProductControlButton
              onPress={() =>
                dispatch(
                  CartActions.updateAmountRequest(item.id, item.amount + 1)
                )
              }
            >
              <Icon name="add-circle-outline" size={20} color={color.primary} />
            </ProductControlButton>
            <ProductSubtotal>{item.subtotal}</ProductSubtotal>
          </ProductControls>
        </Product>
      );
    },
    [dispatch]
  );

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
