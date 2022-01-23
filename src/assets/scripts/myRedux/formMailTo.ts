import { changeFormMailTo, clearFormMailTo } from "./typesActionRedux"

interface IState {
    name: string, middleName: string, city: string, email: string, phone: string, [key: string]: string
}

interface IClearFormMailToAction {
    type: typeof clearFormMailTo
}

interface IChangeFormMailToAction {
    type: typeof changeFormMailTo,
    inputName: string,
    value: string
}
export type TFormMailToAction = IChangeFormMailToAction | IClearFormMailToAction

const initStateFormMailTo: IState = {
    name: "", middleName: "", city: "", email: "", phone: "",
}

export const formMailToReducer = (state: IState = initStateFormMailTo, action: TFormMailToAction): IState => {
    switch (action.type) {
        case clearFormMailTo:
            state = initStateFormMailTo
            return {
                ...state
            }
        case changeFormMailTo:
            return {
                ...state, [action.inputName]: action.value
            }
        default:
            return state
    }
}