/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LoanState } from "../Models/LoanState";
import {
  SET_ADDBUTTON_VISIBILITY,
  SET_FILTER_VALUES,
  SET_LOAN_COPY_VALUES,
  SET_LOAN_VALUES,
} from "./loan.types";

const initialState: LoanState = {
  loanValues: [],
  loanValuesCopy: [],
  loanFilter: {
    date: {
      fromDate: null,
      toDate: null,
    },
    cropTypeId: 0,
    farmerTypeId: 0,
  },
  isAddButtonDisabled: false,
};

export const loanReducer = (state = initialState, action: any): LoanState => {
  switch (action.type) {
    case SET_LOAN_VALUES:
      return {
        ...state,
        loanValues: action.payload,
      };
    case SET_LOAN_COPY_VALUES:
      return {
        ...state,
        loanValuesCopy: action.payload,
      };
    case SET_FILTER_VALUES:
      return {
        ...state,
        loanFilter: action.payload,
      };
    case SET_ADDBUTTON_VISIBILITY:
      return {
        ...state,
        isAddButtonDisabled: action.payload,
      };
    default:
      return state;
  }
};
