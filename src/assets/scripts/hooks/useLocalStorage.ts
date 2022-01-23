import { IShopCartItem } from "../interfaces"

interface ISetLocalStorage {
    action: "get",
    name: string,
}
interface IGetLocalStorage {
    action: "set",
    name: string,
    data: IShopCartItem[]
}
type TuseLocalStorage = ISetLocalStorage | IGetLocalStorage
const version = '_v.1.0'
export function useLocalStorage(param: TuseLocalStorage): IShopCartItem[] {
    if (typeof window === 'undefined') return []
    if (param.action === 'set') {
        localStorage.setItem(param.name + version, JSON.stringify(param.data))
    } else if (param.action === 'get') {
        let res = localStorage.getItem(param.name + version)
        if (!res) return []
        return JSON.parse(res)
    }
    return []
}