import React from "react";
import { useTypeSelector } from "../../assets/scripts/hooks/useTypeSelector";
import { TGoodItem } from "../../assets/scripts/interfaces";
import { Good } from "./Good";

function filteringGodds(goods: TGoodItem[], valueSearch: string) {
    if (valueSearch === "") return goods
    return goods.filter(item => {
        return item.name.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1
    })
}

export function Goods() {
    const { goods } = useTypeSelector(state => state.products)
    const { currentChapter } = useTypeSelector(state => state.products)
    const { valueSearch } = useTypeSelector(state => state.products)
    const filterGoods = filteringGodds(goods, valueSearch)

    return (
        <>
            <ul className="goods__list">
                {goods &&
                    filterGoods.map(item => {
                        if (currentChapter === 'Все товары') {
                            return <Good key={item.id} item={item} />
                        } else if (currentChapter === item.chapter) {
                            return <Good key={item.id} item={item} />
                        }
                    })
                }
            </ul>
        </>
    )
}