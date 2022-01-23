import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { usePath } from "../../assets/scripts/hooks/usePath";
import { IShopCartItem } from "../../assets/scripts/interfaces";
import { TShopCartAction } from "../../assets/scripts/myRedux/shopCart";
import { changeShoppingCart, deleteItemShoppingCart } from "../../assets/scripts/myRedux/typesActionRedux";

interface ShopCartProduct {
    item: IShopCartItem
}

export function ShopCartProduct({ item }: ShopCartProduct) {

    const dispatch: Dispatch<TShopCartAction> = useDispatch()
    const handleClickUp = () => {
        item.quantity = String(parseInt(item.quantity) + 1)
        dispatch({ type: changeShoppingCart, item })
    }
    const handleClickDown = () => {
        if (parseInt(item.quantity) > 1) {
            item.quantity = String(parseInt(item.quantity) - 1)
            dispatch({ type: changeShoppingCart, item })
        }
    }
    const handleClickDelete = () => {
        dispatch({ type: deleteItemShoppingCart, item })
    }
    return (
        <>
            <li className="shop-cart__list_item">
                <Link to={"/shop/" + item.id}>
                    <img className="shop-cart__item_img" height="200" src={usePath() + item.path_img} alt="img" />
                </Link>
                <div className="shop-cart__item_info">
                    <div className="shop-cart__item_name">
                        {item.name}
                    </div>
                    <div className="shop-cart__item_weight">
                        {item.weight} грамм
                    </div>
                </div>
                <div className="shop-cart__item_control">
                    <div className="item__control_quantity">
                        <button onClick={handleClickDown} className="control__quantity_btn control__quantity quantity__btn_down">
                        </button>
                        <div className="control__quantity_text control__quantity">
                            {item.quantity}
                        </div>
                        <button onClick={handleClickUp} className="control__quantity_btn control__quantity quantity__btn_up">
                        </button>
                    </div>
                    <div className="item__control_price">
                        {item.price} ₽/ шт
                    </div>
                    <button onClick={handleClickDelete} className="control__btn_delete">удалить</button>
                </div>
                <div className="shop-cart__item_tottal-price">
                    {parseInt(item.price) * parseInt(item.quantity)} ₽
                </div>
            </li>
        </>
    )
}