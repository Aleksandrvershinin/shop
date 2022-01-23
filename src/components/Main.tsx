import React from "react";
import { ControlGoods } from "./ControlGoods/ControlGoods";
import { Goods } from "./Goods/Goods";
import { InfoContainer } from "./InfoContainer";

export function Main() {
    return (
        <>
            <InfoContainer></InfoContainer>
            <section className="section shop__section">
                <div className="shop__container container">
                    <ControlGoods></ControlGoods>
                    <Goods></Goods>
                </div>
            </section>
        </>
    )
}