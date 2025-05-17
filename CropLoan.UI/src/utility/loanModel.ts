/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoanAmount {
  uid: string;
  customerName: string;
  cropType: string;
  acre: number;
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
