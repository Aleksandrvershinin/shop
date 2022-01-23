import React from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { IProductsAction } from "../../assets/scripts/myRedux/products";
import { changeChapter } from "../../assets/scripts/myRedux/typesActionRedux";

type chapter = {
    chapter: string
}

export function Chapter({ chapter }: chapter) {
    const dispatch: Dispatch<IProductsAction> = useDispatch()
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.currentTarget.textContent) return;
        dispatch({ type: changeChapter, value: e.currentTarget.textContent })
    }
    return (
        <>
            <div onClick={handleClick} className="catalog__list_item">
                {chapter}
            </div>
        </>
    )
}