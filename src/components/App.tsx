import React from "react";
import "../assets/style/normalize.css";
import "../assets/style/style.scss"
import "../assets/style/darkMode.scss"
import { Main } from "./Main";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Product } from "./Product/Product";
import { ShopCart } from "./shopCart/shopCart";
import { myCreateStore } from "../assets/scripts/myRedux/myCreateStore";

const store = myCreateStore();

export function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/shop" element={<Main />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/shop/shop-cart" element={<ShopCart />} />
      </Routes>
    </Provider >
  );
}

