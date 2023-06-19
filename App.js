import React from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import MainNavigation from "./navigations/MainNavigation";
import reducer from "./store/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};

export default App;
