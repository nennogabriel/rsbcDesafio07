import React, { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default class Main extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    this.setState({
      products: response.data,
    });
  }

  handleAddProduct = () => {
    return null;
  };

  renderProduct = ({ item }) => {
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>R$ {item.price}</ProductPrice>
        <AddButton onPress={() => this.handleAddProduct(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ProductAmountText>{0}</ProductAmountText>
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
