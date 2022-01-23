import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useCheckInput } from "../../assets/scripts/hooks/useCheckInput";
import { useTypeSelector } from "../../assets/scripts/hooks/useTypeSelector";
import { TFormMailToAction } from "../../assets/scripts/myRedux/formMailTo";
import { clearFormMailTo } from "../../assets/scripts/myRedux/typesActionRedux";
import { Input } from "../Input";
import { inputs } from "./inputs";
import { sendForm } from "./sendForm";

interface formMailProps {
    handleClickClose: Function
}

export function FormMail({ handleClickClose }: formMailProps) {
    const { goodsShopCart } = useTypeSelector(state => state.shopCart)
    const dispatch: Dispatch<TFormMailToAction> = useDispatch()
    const [sending, setSending] = useState(false)
    const [message, setMessage] = useState("")

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        let countError = 0
        e.preventDefault()
        const elements = e.currentTarget.elements
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].nodeName === "INPUT") {
                const elem = elements[i] as HTMLInputElement
                if (useCheckInput(elem)) {
                    elem.classList.add('error')
                    countError++
                }
            }
        }
        if (countError === 0) {
            setSending(true)
            try {
                let res = await sendForm(e.currentTarget, goodsShopCart)
                let result = await res.json();
                setMessage(result.message)
                dispatch({ type: clearFormMailTo })
            } catch (error) {
                console.log(error);
                setMessage("произошла ошибка, попробуйте позже")
            } finally {
                setSending(false)
            }
        }
    }
    const handleClick = () => {
        setMessage("")
        handleClickClose()
    }


    return (
        <>
            <div className="shop-cart__body__form body__pop-up">
                <div className="pop-up shop-cart__pop-up">
                    <div onClick={handleClick} className="shop-cart__form__close form__close"></div>
                    {!message ?
                        <form onSubmit={formSubmit} className="shop-cart__form">
                            {
                                inputs.map(item => {
                                    return (
                                        <Input key={item.id} obj={item} />
                                    )
                                })
                            }
                            <div className="shop-cart__form_sending"></div>
                            <button type="submit" disabled={sending} className="btn shop-cart__form_btn btn__custom">Отправить заказ</button>
                        </form>
                        :
                        <p className="shop-cart__pop-up_message">{message}</p>
                    }
                </div>
            </div>
        </>
    )
}