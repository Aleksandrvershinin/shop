import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { formMailToReducer } from "./formMailTo";
import { productsReducer } from "./products";
import { shopCartReducer } from "./shopCart";

export const rootReducer = combineReducers({
    products: productsReducer,
    shopCart: shopCartReducer,
    formMailTo: formMailToReducer
})

export type TRootState = ReturnType<typeof rootReducer>

export function myCreateStore() {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
    return store
}