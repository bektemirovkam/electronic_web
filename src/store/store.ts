import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  categoriesReducer,
  contractorsReducer,
  authReducer,
  ordersReducer,
} from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  contractors: contractorsReducer,
  orders: ordersReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
