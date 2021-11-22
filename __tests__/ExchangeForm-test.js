import React from 'react';
import renderer from 'react-test-renderer';
import ExchangeForm from '../components/ExchangeForm';

test('renders correctly', () => {
  const tree = renderer.create(<ExchangeForm />).toJSON();
  expect(tree).toMatchSnapshot();
});