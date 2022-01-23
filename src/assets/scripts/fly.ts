interface IFly {
    flyElem: HTMLElement,
    toSelector?: string,
    duration?: number,
    callBack: Function
}
export function fly({ flyElem, toSelector = '._fly-to', duration = 500, callBack }: IFly): void {
    const elemTo = document.querySelector(toSelector)
    if (!flyElem || !elemTo) return
    if (!Number.isInteger(duration)) {
        throw new Error("duration не является целым числом")
    }
    const width = flyElem.getBoundingClientRect().width
    const height = flyElem.getBoundingClientRect().height
    const left = flyElem.getBoundingClientRect().left
    const top = flyElem.getBoundingClientRect().top + window.pageYOffset
    const elem: any = flyElem.cloneNode()
    elem.style = `position:absolute; top:${top}px; left:${left}px; transition-property:top,left,transform;transition-duration:${duration}ms; transition-timing-function: linear;`
    document.body.append(elem)


    const widthTo = elemTo.getBoundingClientRect().width
    const heightTo = elemTo.getBoundingClientRect().height
    const leftTo = elemTo.getBoundingClientRect().left + (widthTo / 2)
    const topTo = elemTo.getBoundingClientRect().top + window.pageYOffset + (heightTo / 2)


    elem.style.top = `${topTo - (height / 2)}px`
    elem.style.left = `${leftTo - (width / 2)}px`
    elem.style.transform = 'scale(0.1)'
    setTimeout(() => {
        elem.remove()
        if (callBack) {
            callBack()
        }
    }, duration);
}