import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';

import {
  addToCartSuccess,
  updateAmountSuccess,
  updateAmountRequest,
} from './actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  if (productExists) {
    yield put(updateAmountRequest(id, productExists.amount + 1));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const response = yield call(api.get, `/stock/${id}`);
  const stockAmount = response.data.amount;

  if (amount > stockAmount) {
    console.tron.warn('Eba! acabou o estoque');
    Alert.alert('Quantidade solicitada fora de estoque.');
    yield put(updateAmountSuccess(id, stockAmount));
  } else {
    yield put(updateAmountSuccess(id, amount));
  }
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
