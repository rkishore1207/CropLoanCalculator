/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "../store/store";
import {
  setDuplicatePageName,
  setHideNaveButton,
} from "../store/LoanStore/loan.actions";

const BASE_URL = "https://localhost:7064/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => {
    store.dispatch(setHideNaveButton(false));
    return response;
  },
  (error: any) => {
    if (error.code === "ERR_NETWORK") {
      store.dispatch(setHideNaveButton(true));
    } else if (error.response?.data?.errorCode === "ERR_DUPLICATE_NAME") {
      store.dispatch(setDuplicatePageName(true));
    }
    return Promise.reject(error);
  }
);

export default api;
