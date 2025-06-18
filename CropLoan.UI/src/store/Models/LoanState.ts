import type { LoanAmount, LoanFilter } from "../../utility/loanModel";

export interface LoanState {
  loanValues: LoanAmount[];
  loanValuesCopy: LoanAmount[];
  loanFilter: LoanFilter;
  isAddButtonDisabled: boolean;
}
