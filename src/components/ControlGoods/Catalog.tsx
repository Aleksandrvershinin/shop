import React, { useRef } from "react";
import { useTypeSelector } from "../../assets/scripts/hooks/useTypeSelector";
import { Chapter } from "./Chapter"

// выводит список разделов
export function Catalog() {
    const { chapters } = useTypeSelector(state => state.products)

    const ref: React.RefObject<HTMLButtonElement> = useRef(null)
    const toggleClass = () => {
        if (ref.current) {
            ref.current.classList.toggle('is-active')
        }
    }
    return (
        <>
            <button ref={ref} onClick={toggleClass} className="catalog__btn">
                <div className="burger catalog__burger">
                    <div className="burger__line"></div>
                    <div className="burger__line"></div>
                    <div className="burger__line"></div>
                </div>
                <p>Каталог товаров</p>
                <ul className="catalog__list">
                    {chapters &&
                        chapters.map(item => {
                            return (
                                <Chapter key={item} chapter={item}></Chapter>
                            )
                        })
                    }
                </ul>
            </button>
        </>
    )
}