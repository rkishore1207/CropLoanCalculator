/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./interceptor";
import type { LoanAmount, LoanFilter, Page } from "../utility/loanModel";

const apiEntity = {
  CropLoan: "/cropLoan",
};

class LoanService {
  async getLoans(pageUID: string) {
    const response = await api.get(
      apiEntity.CropLoan + `/page/${pageUID}/loans`
    );
    return response.data;
  }

  async addOrUpdateLoan(payload: LoanAmount) {
    return await api.post(apiEntity.CropLoan + "/addOrUpdateLoan", payload);
  }

  async getLoansWithFilter(payload: LoanFilter) {
    const response = await api.post(
      apiEntity.CropLoan + "/loansWithFilter",
      payload
    );
    return response.data;
  }

  async generateExcel(pageUID: string) {
    await api.get(apiEntity.CropLoan + `/page/${pageUID}/generateExcel`);
  }

  async deleteLoan(loanUID: any) {
    await api.delete(apiEntity.CropLoan + "/" + loanUID + "/deleteLoan");
  }

  async getPages() {
    const response = await api.get(apiEntity.CropLoan + "/pages");
    return response.data;
  }

  async addOrUpdatePage(payload: Page) {
    return await api.post(apiEntity.CropLoan + "/addOrUpdatePage", payload);
  }

  async deletePage(pageUID: any) {
    await api.delete(apiEntity.CropLoan + "/" + pageUID + "/deletePage");
  }
}

export default new LoanService();
