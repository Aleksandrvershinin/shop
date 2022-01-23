type tDirection = 'top' | 'down'

export function initShare(param: tDirection) {
    // устанавливаем направление открытие окна
    direction = param
    // получаем элементы в которых есть кнопки поделиться
    let bodyShare = document.querySelectorAll('._body__share');
    // цикл по элементам
    bodyShare.forEach(element => {
        element.addEventListener('click', (e) => {
            // слышаем событие клик по элементам
            clickShare(e)
        })
    })
}
let btn: HTMLElement | undefined
let divShare: HTMLElement | undefined
let direction: tDirection
let className = 'share_list'

// функция отработка кликов
function clickShare(event: Event) {
    // получаем элемент на котором произошло событие
    const elem = (<HTMLElement>event.target)
    // проверяем если клик произошел на кнопке "Скопировать ссылку"
    if (elem?.closest('.share__link')) {
        clickLink(<HTMLElement>elem?.closest('.share__link'))
        return
    }
    // проверяем на нужный нам элемент
    if (!elem.classList.contains('_share')) return
    // запуск функции удаления блока с кнопками
    deleteElement()
    // проверяем клик произошел на той же кнопке под которой открыт список
    if (btn === elem) {
        // очишаем кнопку
        btn = undefined
        return
    }
    // сохраняем элемент
    btn = elem
    // получаем данные из дата атрибутов элемента
    let url = btn.dataset.url
    let title = btn.dataset.title
    // создаем элемент с кнопками для соц сетей
    divShare = document.createElement('ul')
    divShare.className = className
    divShare.innerHTML = `
        <li class="share_item"  data-sharer="vk" data-title="${title}" data-url="${url}">
            <div class="share__icon share__icon_vk"></div>
           <p>ВКонтакте</p>
        </li>
        <li class="share_item" data-sharer="facebook" data-url="${url}">
            <div class="share__icon share__icon_facebook"></div>
            <p>Facebook</p>
        </li>
        <li class="share_item" data-sharer="okru" data-url="${url}" data-title="${title}">
            <div class="share__icon share__icon_ok"></div>
            <p>Одноклассники</p>
        </li>
        <li class="share_item" data-sharer="telegram" data-title="${title}" data-url="${url}">
            <div class="share__icon share__icon_telegram"></div>
            <p>Telegram</p>
        </li>
        <li class="share_item" data-sharer="whatsapp" data-title="${title}" data-url="${url}">
            <div class="share__icon share__icon_whatsapp"></div>
            <p>WhatsApp</p>
        </li>
        <li class="share_item" data-sharer="viber" data-title="${title}" data-url="${url}">
            <div class="share__icon share__icon_viber"></div>
            <p>Viber</p>
        </li>`
    // проверяем протокол
    if (window.location.protocol === 'https:') {
        // создаем доп ссылку "скопировать ссылку"
        divShare.insertAdjacentHTML('beforeend', `
        <li class="share_item share__link" data-url="${url}">
            <div class="share__icon share__icon_link"></div>
            <p>Скопировать ссылку</p>
        </li>`
        )
    }
    // вставляем элемент
    document.body.append(divShare)
    // устанавливаем позицию
    setPosition(btn, divShare)
    // иницилизация скрипта
    // @ts-ignore
    window.Sharer.init();
}

if (typeof window !== 'undefined') {
    // вешаем обработчик на документ для удаления окна при клике в не элемента
    document.addEventListener('click', checkDeleteElement)
}
// проверка на удаление элемента
function checkDeleteElement(e: Event) {
    // получаем элемент на котором произошло событие
    const elem = (<HTMLElement>e.target).closest('.share__link')
    // проверяем если клик произошел на кнопке "Скопировать ссылку"
    if (elem) {
        clickLink(<HTMLElement>elem)
        return
    }
    // проверка что элемент существует
    if (!divShare) return
    // проверка что клик произошел не внутри элемента и не на кнопке
    if (!divShare.contains(<HTMLElement>e.target) && !(<HTMLElement>e.target).classList.contains('_share')) {
        // очищаем кнопку и элемент
        btn = divShare = undefined
        // удаляем элемент
        deleteElement()
    }
}
// функция удаления элемента
function deleteElement() {
    let divShare = document.querySelector(`.${className}`);
    divShare?.remove()
}

function setPosition(btn: HTMLElement, elem: HTMLElement) {
    // получаем растояние до верха кнопки
    const topPosBtn = btn.getBoundingClientRect().top
    // получаем растояние до низа кнопки
    const bottomPosBtn = btn.getBoundingClientRect().bottom
    // получаем растояние до правого края кнопки
    const rightPosBtn = btn.getBoundingClientRect().right
    // получаем высоту елемента с кнопками
    const heightElem = elem.clientHeight;
    // получаем ширину елемента с кнопками
    const widthElem = elem.clientWidth;
    // устанавливаем локальную переменную с направлением
    let direct = direction
    // проверяем установлено ли направление
    if (direct === undefined) {
        // устанавливаем направление по умолчанию
        direct = "top"
        // провреяем уместится ли элемент сверху
        if (heightElem > topPosBtn) {
            // устанавливаем направление вниз
            direct = "down"
        }
    }

    // устанавливаем элемент в зависимости от направления
    switch (direct) {
        case 'top':
            elem.style.top = `${topPosBtn - heightElem - 10}px`
            elem.style.left = `${rightPosBtn - widthElem + 10}px`
            break;
        case 'down':
            elem.style.top = `${bottomPosBtn + 10}px`
            elem.style.left = `${rightPosBtn - widthElem + 10}px`
            break;
    }
}

function clickLink(element: HTMLElement) {
    if (!element.dataset.url) return
    navigator.clipboard.writeText(element.dataset.url)
}