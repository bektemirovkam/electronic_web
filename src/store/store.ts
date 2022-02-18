import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  categoriesReducer,
  contractorsReducer,
  adminReducer,
  ordersReducer,
  chatsReducer,
} from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  admin: adminReducer,
  categories: categoriesReducer,
  contractors: contractorsReducer,
  orders: ordersReducer,
  chats: chatsReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
