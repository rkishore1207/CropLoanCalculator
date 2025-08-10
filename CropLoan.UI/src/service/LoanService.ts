/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./interceptor";
import type { LoanAmount, LoanFilter } from "../utility/loanModel";

const apiEntity = {
  CropLoan: "/cropLoan",
};

class LoanService {
  async getLoans() {
    const response = await api.get(apiEntity.CropLoan + "/loans");
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

  async generateExcel() {
    await api.get(apiEntity.CropLoan + "/generateExcel");
  }

  async deleteLoan(loanUID: any) {
    await api.delete(apiEntity.CropLoan + "/" + loanUID + "/deleteLoan");
  }
}

export default new LoanService();
