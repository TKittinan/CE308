import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CartScreen from './screens/CartScreen'
// import TodoScreen from './screens/TodoScreen'

export default function App() {
  return (
    <Provider store={store}>
      <CartScreen />
      {/* <TodoScreen/> */}
    </Provider>
  );
}