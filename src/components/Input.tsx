import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useCheckInput } from "../assets/scripts/hooks/useCheckInput";
import { useTypeSelector } from "../assets/scripts/hooks/useTypeSelector";
import { changeFormMailTo } from "../assets/scripts/myRedux/typesActionRedux";

interface input {
    obj: {
        classes: string,
        id: string,
        name: string,
        required: boolean,
        textLabel: string,
        type: string,
        value: string,
    }
}

export function Input({ obj }: input) {

    const value = useTypeSelector(state => state.formMailTo[obj.name])
    const dispatch = useDispatch()
    const [error, setError] = useState(false)

    const hadlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: changeFormMailTo, inputName: obj.name, value: e.target.value.trim() })
        setError(useCheckInput(e.target))
    }
    const removeError = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        e.target.classList.remove('error')
    }
    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove('error')
        if (obj.name === "phone") {
            if (/[^\d\+]/ig.test(e.target.value.trim())) return
        }
        dispatch({ type: changeFormMailTo, inputName: obj.name, value: e.target.value })
    }

    return (
        <>
            <label className={`${obj.classes}_label`} htmlFor={obj.id}>{obj.textLabel}</label>
            <input onBlur={hadlerBlur} onFocus={removeError} onChange={changeInput} className={`${obj.classes}_input ${error ? 'error' : ''}`} name={obj.name} type={obj.type} id={obj.id} value={value} />
        </>
    )
}