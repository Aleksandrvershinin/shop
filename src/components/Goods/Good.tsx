import React, { useEffect, useRef, useState } from "react";
import { BuyButton } from "../BuyButton";
import { Link } from "react-router-dom";
import { usePath } from "../../assets/scripts/hooks/usePath";
import { TGoodItem } from "../../assets/scripts/interfaces";

interface goodProps {
    item: TGoodItem
}
export type flyElem = HTMLElement
export function Good({ item }: goodProps) {
    const [flyElem, setFlyElem] = useState(null)
    const refFlyElem = useRef(null)
    const [path, setPath] = useState('')

    useEffect(() => {
        setPath(usePath())
    }, []);

    useEffect(() => {
        setFlyElem(refFlyElem?.current)
    }, [refFlyElem])
    return (
        <>
            <li className="goods__list_item" >
                <Link to={"/shop/" + item.id}>
                    <img ref={refFlyElem} className="goods__item_img" height="240" src={path + item.path_img} alt="img" />
                </Link>
                <p className="goods__item_name">{item.name}</p>
                {flyElem &&
                    write(item, flyElem)
                }
            </li>
        </>
    )
}


function write(item: TGoodItem, flyElem: flyElem) {
    if (item.available === 'true') {
        return (
            <>
                <p className="goods__item_price">{item.price + "₽"}</p>
                <BuyButton flyElem={flyElem} item={item} classes={[' goods__item_btn']} ></BuyButton>
            </>
        )
    }
    return <p className="goods__item_unavail">недоступно</p>

}
