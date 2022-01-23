import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { usePath } from "../../assets/scripts/hooks/usePath";
import { useTypeSelector } from "../../assets/scripts/hooks/useTypeSelector";
import { initShare } from "../../assets/scripts/module_share";
import { BackBtn } from "../BackBtn";
import { BuyButton } from "../BuyButton";
import { IconShopCart } from "../IconShopCart";


export function Product() {
    const { id } = useParams()
    const { goods } = useTypeSelector(state => state.products)
    const [flyElem, setFlyElem] = useState(null)
    const refFlyElem = useRef(null)
    const product = goods.find(item => item.id === id)
    const [path, setPath] = useState('')
    const sharePath = path + useLocation().pathname
    useEffect(() => {
        window.scrollTo(0, 0);
        initShare('top')
        setPath(usePath())
    }, []);

    useEffect(() => {
        setFlyElem(refFlyElem?.current)
    }, [refFlyElem])
    return (
        <section>
            <IconShopCart classes={[" product__shop-cart_icon"]} />
            <div className="container container__product">
                <BackBtn />
                <div className="container__product_wrapper">
                    <h1 className="product__title product__title_mob">{product?.name}</h1>
                    <div className="product__first_block">
                        <img ref={refFlyElem} className="first__block_img " height="350px" src={path + product?.path_img} alt="image" />
                        <div className="wrapper__share _body__share">
                            <button data-url={sharePath} data-title={product?.name} className="first__block_share _share">Поделиться </button>
                        </div>
                        {product?.href_pdf &&
                            <div className="book-download">
                                <span>Cкачать -</span>
                                <a href={product.href_pdf}> pdf,</a>
                                <a href={product.href_fb2}> fb2,</a>
                                <a href={product.href_epub}> epub,</a>
                                <a href={product.href_mobi}> mobi</a>
                            </div>
                        }
                    </div>
                    <div className="product__second_block">
                        {product?.translate && <h3 className="second__block_traslate">Перевод с оригинала {product.translate} года</h3>}
                        <h1 className="product__title">{product?.name}</h1>
                        {product?.available === 'true' ?
                            <div className="second__block_buy">
                                <div className="buy__availability">Доступно</div>
                                <div className="buy__price">{product.price} ₽</div>
                                {flyElem &&
                                    <BuyButton flyElem={flyElem} item={product} classes={[" product__buy_btn"]} ></BuyButton>
                                }
                            </div> :
                            <div style={{ fontWeight: '600', color: 'red' }}>недоступно</div>
                        }
                        {product?.description &&
                            <div className="product__description">
                                <p>{product?.description}</p>
                            </div>
                        }
                        {product?.weight &&
                            <div className="product__characteristics">
                                <div className="product__weight">{"Вес - " + product.weight + "грамм."}</div>
                                <div className="product__format">{"Формат - " + product.format}</div>
                                <div className="product__cover-type">{"Тип обложки - " + product.type_of_cover}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}