import React from "react";
import { IconShopCart } from "../IconShopCart";
import { Catalog } from "./Catalog";
import { Search } from "./Search";

const classes: string[] = [" shop__shop-cart_icon"]
export function ControlGoods() {
    return (
        <>
            <div className="control__wrapper">
                <Catalog></Catalog>
                <Search></Search>
                <IconShopCart classes={classes}></IconShopCart>
            </div>
        </>
    )
}