import { useLocalStorage } from "./hooks/useLocalStorage";
import { IShopCartItem } from "./interfaces";
import { goodsInShoppingCart } from "./myRedux/typesActionRedux";


export function setLocalStorage(data: IShopCartItem[]): void {
    useLocalStorage({ action: 'set', data, name: goodsInShoppingCart })
}