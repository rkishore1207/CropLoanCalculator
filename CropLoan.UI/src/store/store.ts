import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { loanReducer } from "./LoanStore/loan.reducer";

const reducer = combineReducers({
  loan: loanReducer,
});

export const store = createStore(reducer, compose(applyMiddleware(thunk)));

export type ReduxState = ReturnType<typeof reducer>;
