import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { fly } from "../assets/scripts/fly";
import { useTypeSelector } from "../assets/scripts/hooks/useTypeSelector";
import { IShopCartItem, TGoodItem } from "../assets/scripts/interfaces";
import { TShopCartAction } from "../assets/scripts/myRedux/shopCart";
import { changeShoppingCart } from "../assets/scripts/myRedux/typesActionRedux";
import { flyElem } from "./Goods/Good";

interface propsButton {
    classes: string[],
    item: TGoodItem,
    flyElem: flyElem
}

export function BuyButton({ classes = [], item, flyElem }: propsButton) {
    const [disabled, setDisabled] = useState(false)
    const { goodsShopCart } = useTypeSelector(state => state.shopCart)
    const dispatch: Dispatch<TShopCartAction> = useDispatch()

    const callBack = () => {
        const newItem: IShopCartItem = { ...item, quantity: '1' }
        dispatch({ type: changeShoppingCart, item: newItem })
        setDisabled(false)
    }
    const handleClick = () => {
        setDisabled(true)
        fly({ flyElem, callBack })
    }
    if (goodsShopCart?.find(elem => elem?.id === item.id)) {
        return <Link to="/shop/shop-cart"><button style={{ backgroundColor: 'green' }} className={"buy__btn" + [...classes]}>в корзине</button></Link>
    }
    return <button disabled={disabled} onClick={handleClick} className={"buy__btn" + [...classes]}> купить</button >
}