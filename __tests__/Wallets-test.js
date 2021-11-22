import React from 'react';
import renderer from 'react-test-renderer';
import Wallet from '../components/Wallets';

test('renders correctly', () => {
  const tree = renderer.create(<Wallet />).toJSON();
  expect(tree).toMatchSnapshot();
});