import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  categoriesReducer,
  contractorsReducer,
  authReducer,
  ordersReducer,
} from "./reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  contractors: contractorsReducer,
  orders: ordersReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
