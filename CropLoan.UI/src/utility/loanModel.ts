import type { SnackbarOrigin } from "@mui/material";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoanAmount {
  uid: string;
  registerNumber: string;
  pageUID: string;
  customerName: string;
  loanNumber: string;
  accountNumber: string;
  cropTypeId: number;
  cropTypeName: string;
  acre: number;
  farmerTypeId: number;
  farmerType: string;
  readyCash: number;
  fertilizer: number;
  seed: number;
  insecticide: number;
  totalAmount: number;
  grandTotal: number;
  thozhuUram: number;
}

export interface CropInput {
  name: string;
  fertilizer: number;
  seed: number;
  insecticide: number;
  amount: number;
}

export interface InputType {
  registerNubmber: string;
  customerName: string;
  loanNumber: string;
  cropType: number;
  acre: any;
}

export interface LoanFilter {
  date: any;
  cropTypeId: number;
  farmerTypeId: number;
}

export interface FilterModel {
  id: number;
  value: string;
  categoryId: number;
  isSelected: boolean;
}

export interface SnackBarModel extends SnackbarOrigin {
  isOpen: boolean;
  message: string;
}

export interface DeletePopupModel {
  canShowDeletePopup: boolean;
  selectedUID: any;
  isSingleDelete: boolean;
}

export interface Page {
  uid: string;
  name: string;
}
