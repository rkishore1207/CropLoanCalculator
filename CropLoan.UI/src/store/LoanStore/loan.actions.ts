import type { LoanAmount, LoanFilter, Page } from "../../utility/loanModel";
import {
  CAN_HIDE_NAV_BUTTONS,
  SET_ADDBUTTON_VISIBILITY,
  SET_DUPLICATE_PAGE_NAME,
  SET_FILTER_VALUES,
  SET_LOAN_COPY_VALUES,
  SET_LOAN_VALUES,
  SET_PAGES,
  SET_SELECTED_PAGE,
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

export const setHideNaveButton = (value: boolean) => {
  return {
    type: CAN_HIDE_NAV_BUTTONS,
    payload: value,
  };
};

export const setPages = (value: Page[]) => {
  return {
    type: SET_PAGES,
    payload: value,
  };
};

export const setSelectedPage = (value: string) => {
  return {
    type: SET_SELECTED_PAGE,
    payload: value,
  };
};

export const setDuplicatePageName = (value: boolean) => {
  return {
    type: SET_DUPLICATE_PAGE_NAME,
    payload: value,
  };
};
