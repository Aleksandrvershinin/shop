import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useTypeSelector } from "../../assets/scripts/hooks/useTypeSelector";
import { IProductsAction } from "../../assets/scripts/myRedux/products";
import { changeValueSearch } from "../../assets/scripts/myRedux/typesActionRedux";


export function Search() {
    const { valueSearch } = useTypeSelector(state => state.products)
    const [valueInput, setValueInput] = useState(valueSearch)
    const dispatch: Dispatch<IProductsAction> = useDispatch()
    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.target.value)
    }
    const submitForm = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch({ type: changeValueSearch, value: valueInput.trim() })
    }
    const cleanSearch = () => {
        setValueInput("")
        dispatch({ type: changeValueSearch, value: "" })
    }
    return (
        <>
            <form aria-label="поиск" className="search__form" onSubmit={submitForm} >
                <div className="search__form_wrapper">
                    <div className="search__icon"></div>
                    <input aria-label="поле для ввода поиска" onChange={changeInput} value={valueInput} type="text" placeholder="Поиск по магазину" className="search__input" />
                </div>
                <button aria-label="искать" className="search__btn">
                    искать
                    <div className="search__btn_icon"></div>
                </button>
                <button aria-label="искать" className="search__btn search__btn_mob">
                    <div className="search__btn_icon"></div>
                </button>
            </form>
            {valueInput !== "" &&
                <button onClick={cleanSearch} aria-label="очистить поиск" className="clean__search"></button>
            }
        </>
    )
}