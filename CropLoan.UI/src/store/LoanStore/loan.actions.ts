import type { LoanAmount, LoanFilter } from "../../utility/loanModel";
import {
  SET_ADDBUTTON_VISIBILITY,
  SET_FILTER_VALUES,
  SET_LOAN_COPY_VALUES,
  SET_LOAN_VALUES,
} from "./loan.types";

export const setLoanValues = (data: LoanAmount[]) => {
  return {
    type: SET_LOAN_VALUES,
    payload: data,
  };
};

export const setLoanCopyValues = (data: LoanAmount[]) => {
  return {
    type: SET_LOAN_COPY_VALUES,
    payload: data,
  };
};

export const setFilterValues = (data: LoanFilter) => {
  return {
    type: SET_FILTER_VALUES,
    payload: data,
  };
};

export const setAddButtonVisibility = (value: boolean) => {
  return {
    type: SET_ADDBUTTON_VISIBILITY,
    payload: value,
  };
};
