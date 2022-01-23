export type TGoodItem = Omit<IShopCartItem, 'quantity'>

export interface IShopCartItem {
    available: string
    chapter: string
    description: string
    format: string
    href_epub: string
    href_fb2: string
    href_mobi: string
    href_pdf: string
    id: string
    name: string
    path: string
    path_img: string
    path_img_for_share: string
    price: string
    translate: string
    type_of_cover: string
    weight: string
    quantity: string
}