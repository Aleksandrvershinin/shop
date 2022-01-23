import { useLocalStorage } from "../hooks/useLocalStorage"
import { IShopCartItem } from "../interfaces"
import { setLocalStorage } from "../setLocalStorage"
import { changeShoppingCart, deleteItemShoppingCart, deleteShoppingCart, goodsInShoppingCart } from "./typesActionRedux"

const goodsShopCart: IShopCartItem[] = useLocalStorage({ action: 'get', name: goodsInShoppingCart })

interface IStateShopCart {
    goodsShopCart: IShopCartItem[]
}

interface IDeleteShoppingCart {
    type: typeof deleteShoppingCart,
}
interface IDeleteItemShoppingCart {
    type: typeof deleteItemShoppingCart | typeof changeShoppingCart,
    item: IShopCartItem
}
export type TShopCartAction = IDeleteShoppingCart | IDeleteItemShoppingCart

const initStateShopCart = {
    goodsShopCart
}

export const shopCartReducer = (state: IStateShopCart = initStateShopCart, action: TShopCartAction): IStateShopCart => {
    switch (action.type) {
        case deleteShoppingCart:
            state.goodsShopCart = []
            setLocalStorage(state.goodsShopCart)
            return { ...state }
        case deleteItemShoppingCart:
            const indexItem = state.goodsShopCart.findIndex(elem => elem.id === action.item.id)
            if (indexItem >= 0) {
                state.goodsShopCart.splice(indexItem, 1)
            }
            state.goodsShopCart = [...state.goodsShopCart]
            setLocalStorage(state.goodsShopCart)
            return { ...state }
        case changeShoppingCart:
            const index = state.goodsShopCart.findIndex(elem => elem?.id === action.item.id)
            if (index >= 0) {
                state.goodsShopCart.splice(index, 1, action.item)
            } else {
                state.goodsShopCart.push(action.item)
            }
            state.goodsShopCart = [...state.goodsShopCart]
            setLocalStorage(state.goodsShopCart)
            return { ...state }
        default:
            return state
    }
}