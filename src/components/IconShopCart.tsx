import React from "react";
import { Link } from "react-router-dom";
import { useTypeSelector } from "../assets/scripts/hooks/useTypeSelector";

interface IconShopCartProps {
    classes?: string[]
}

export function IconShopCart({ classes = [] }: IconShopCartProps) {
    const { goodsShopCart } = useTypeSelector(state => state.shopCart)

    return (
        <>
            <Link to='/shop/shop-cart'>
                <div className={"_fly-to shop-cart__icon" + [...classes]} >
                    <div className="shop-cart__icon_count">{goodsShopCart.length}</div>
                </div>
            </Link>
        </>
    )
}