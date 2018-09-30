import 'materialize-css/dist/css/materialize.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import ReduxToastr from 'react-redux-toastr';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        showCloseButton={true}/>
    </div>
  </Provider>,
  document.querySelector("#root"));
