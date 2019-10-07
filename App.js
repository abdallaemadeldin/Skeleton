import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/redux/reducers';
import WindowStack from './src/lib/windowStack';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleWare(reducers);

class App extends Component {
  
  render() {
    return(
      <Provider store={store}>
        <WindowStack />
      </Provider>
    );
  }
}

export default App;
