import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodoScreen from './screens/TodoScreen';

export default function App() {
  return (
    <Provider store={store}>
      <TodoScreen />
    </Provider>
  );
}