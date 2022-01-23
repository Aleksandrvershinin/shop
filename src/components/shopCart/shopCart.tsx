import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ShopCartProduct } from "./ShopCartProduct";
import { Link } from "react-router-dom";
import { BackBtn } from "../BackBtn";
import { FormMail } from "./FormMail";
import { useDeclOfNum } from "../../assets/scripts/hooks/useDeclOfNum";
import { useTypeSelector } from "../../assets/scripts/hooks/useTypeSelector";
import { deleteShoppingCart } from "../../assets/scripts/myRedux/typesActionRedux";
import { Dispatch } from "redux";
import { TShopCartAction } from "../../assets/scripts/myRedux/shopCart";

export function ShopCart() {
    const [openForm, setOpenForm] = useState(false)
    const { goodsShopCart } = useTypeSelector(state => state.shopCart)
    const goodsLength = useDeclOfNum(goodsShopCart.length, ['наименование', 'наименования', 'наименований'])
    let allGoods = 0
    let allWeight = 0
    let sum = 0
    goodsShopCart.forEach(elem => {
        allGoods = allGoods + (1 * parseInt(elem.quantity))
        allWeight = allWeight + (parseInt(elem.weight) * parseInt(elem.quantity))
        sum = sum + (parseInt(elem.price) * parseInt(elem.quantity))
    });
    const allGoodsStr = useDeclOfNum(allGoods, ['товар', 'товара', 'товаров'])
    const dispatch: Dispatch<TShopCartAction> = useDispatch()
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleClick = () => {
        dispatch({ type: deleteShoppingCart })
    }
    return (
        <>
            <div className="shop-cart__container container">
                <BackBtn />
                <div className="shop-cart__header">
                    <h1 className="shop-cart__title">Корзина</h1>
                    <div className="shop-cart__header_wrapper">
                        {goodsShopCart.length > 0 ?
                            <>
                                <div className="shop-cart__goods-length">{goodsLength}</div>
                                <button onClick={handleClick} className="shop-cart__delete_btn">удалить все товары</button>
                            </> :
                            <p>Корзина пока пуста, перейдите в <Link to="/shop">магазин</Link>, что бы добавить товаров в корзину</p>
                        }
                    </div>
                </div>
                {goodsShopCart.length > 0 &&
                    <>
                        <ul className="shop-cart__list">
                            {goodsShopCart.map(item => {
                                if (item.id !== undefined) {
                                    return <ShopCartProduct key={item.id} item={item} />
                                }
                            })}
                        </ul>
                        <div className="shop-cart__total">
                            <div className="shop-cart__total_weight">{allGoodsStr + " на " + allWeight + " грамм"}</div>
                            <div className="shop-cart__total_sum">Итого без доставки {sum} ₽</div>
                            <button onClick={() => setOpenForm(true)} className="shop-cart__total_btn btn btn__custom">Оформить заказ</button>
                        </div>
                        {openForm &&
                            <FormMail handleClickClose={() => setOpenForm(false)} />
                        }
                    </>
                }
            </div>
        </>
    )
}