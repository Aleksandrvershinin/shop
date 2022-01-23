import React from "react";
import { useNavigate, Link } from "react-router-dom";

export function BackBtn() {
    const navigate = useNavigate();
    return (
        <div className="back__btn">
            <a style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>назад</a>
            <span className="back__btn_slash"> / </span>
            <Link to="/shop">магазин</Link>
        </div>
    )
}