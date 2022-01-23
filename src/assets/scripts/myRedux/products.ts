import { TGoodItem } from "../interfaces"
import { changeChapter, changeValueSearch } from "./typesActionRedux"
import goods from "../goods.json";

interface IState {
    chapters: string[],
    goods: TGoodItem[],
    currentChapter: string,
    valueSearch: string
}
export interface IProductsAction {
    type: typeof changeChapter | typeof changeValueSearch
    value: string
}

const initStateProducts: IState = {
    chapters: [
        'Книги Шрилы Прабхупады',
        'Вайшнавская атрибутика',
        'Музыкальные инструменты',
        'Благовония и прочее',
        'Все товары',
    ],
    goods,
    currentChapter: 'Все товары',
    valueSearch: "",
}

export const productsReducer = (state: IState = initStateProducts, action: IProductsAction): IState => {
    switch (action.type) {
        case changeChapter:
            return {
                ...state, currentChapter: action.value
            }
        case changeValueSearch:
            return {
                ...state, valueSearch: action.value
            }
        default:
            return state
    }
}