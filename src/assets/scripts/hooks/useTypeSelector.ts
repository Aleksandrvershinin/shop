import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../myRedux/myCreateStore";

export const useTypeSelector: TypedUseSelectorHook<TRootState> = useSelector