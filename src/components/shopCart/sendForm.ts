import { usePath } from "../../assets/scripts/hooks/usePath";
import { IShopCartItem } from "../../assets/scripts/interfaces";


export async function sendForm(form: HTMLFormElement, goods: IShopCartItem[]) {
    const formData = new FormData(form)
    formData.append('goods', JSON.stringify(goods));

    const response = await fetch(`${usePath()}/php/send.php`, {
        method: 'POST',
        body: formData,
    });
    return response
}