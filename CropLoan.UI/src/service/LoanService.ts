/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { LoanAmount, LoanFilter } from "../utility/loanModel";

const BASE_URL = "https://localhost:7064/api";

const apiEntity = {
  CropLoan: "/cropLoan",
};

class LoanService {
  async getLoans() {
    const response = await axios.get(BASE_URL + apiEntity.CropLoan + "/loans");
    return response.data;
  }

  async addOrUpdateLoan(payload: LoanAmount) {
    return await axios.post(
      BASE_URL + apiEntity.CropLoan + "/addOrUpdateLoan",
      payload
    );
  }

  async getLoansWithFilter(payload: LoanFilter) {
    const response = await axios.post(
      BASE_URL + apiEntity.CropLoan + "/loansWithFilter",
      payload
    );
    return response.data;
  }

  async generateExcel() {
    await axios.get(BASE_URL + apiEntity.CropLoan + "/generateExcel");
  }

  async deleteLoan(loanUID: any) {
    await axios.delete(
      BASE_URL + apiEntity.CropLoan + "/" + loanUID + "/deleteLoan"
    );
  }
}

export default new LoanService();
