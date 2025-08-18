/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LoanState } from "../Models/LoanState";
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
  canHideNavButtons: false,
  selectedPage: "",
  pages: [],
  isDuplicatePageName: false,
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
    case CAN_HIDE_NAV_BUTTONS:
      return {
        ...state,
        canHideNavButtons: action.payload,
      };
    case SET_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case SET_SELECTED_PAGE:
      return {
        ...state,
        selectedPage: action.payload,
      };
    case SET_DUPLICATE_PAGE_NAME:
      return {
        ...state,
        isDuplicatePageName: action.payload,
      };
    default:
      return state;
  }
};
