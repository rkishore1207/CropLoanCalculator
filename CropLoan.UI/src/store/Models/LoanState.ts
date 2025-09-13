import type { LoanAmount, LoanFilter, Page } from "../../utility/loanModel";

export interface LoanState {
  loanValues: LoanAmount[];
  loanValuesCopy: LoanAmount[];
  loanFilter: LoanFilter;
  isAddButtonDisabled: boolean;
  canHideNavButtons: boolean;
  pages: Page[];
  selectedPage: string;
  isDuplicatePageName: boolean;
}
