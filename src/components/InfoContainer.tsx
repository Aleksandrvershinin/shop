import React from "react";


export function InfoContainer() {
    return (
        <>
            <section>
                <div className="info__container container">
                    <div className="info__wrapper_contacts">
                        <div className="info__contacts">
                            <h1 className="shop__title">Магазин</h1>
                            <a className="info__contacts_phone" href="tel:+79189717787">+7 918 1616108</a>
                        </div>
                        <p className="info__contacts_email">
                            Эл.почта
                            <a href="mailto:obratnokbogu@mail.ru">obratnokbogu@mail.ru</a>
                        </p>

                    </div>
                    <div className="info__logo">
                        Bhaktivedanta Book Trust
                    </div>
                    <p className="info__description">
                        Его Божественная Милость А.Ч.Бхактиведанта Свами Прабхупада, основатель и ачарья ISKCON (ИСККОН), опубликовал более 70 книг, содержащих его лекции, комментарии и переводы ведичеческих писаний с санскрита на английский.
                    </p>
                </div>
            </section>
        </>
    )
}