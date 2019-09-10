import styled from 'styled-components/native';
import * as color from '../../styles/color';
import logo from '../../assets/logo.png';

export const ContainerSafe = styled.SafeAreaView`
  background: ${color.background};
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const HomeButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-start;
  /* background: #f00; */
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'contain',
})`
  height: 24px;
  margin-left: -46px;
`;

export const CartButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  /* background: #f00; */
  margin-left: 30%;
`;

export const CartText = styled.Text`
  position: absolute;
  text-align: center;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  background: ${color.primary};
  color: #fff;
  font-size: 12px;
  padding: 2px;
  border-radius: 9px;
  overflow: hidden;
`;
