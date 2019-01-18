import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import placesReducer from "./reducers/places";
import navigationReducer from "./reducers/navigation";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

const middlewares = [navEnhancer];
const navReducer = createNavigationReducer(AppNavigator);
const rootReducer = combineReducers({
  places: placesReducer,
  nav: navReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(navEnhancer)
  );
};

export default configureStore;
