import type { FilterModel } from "./loanModel";

export const cropDropdownOptions = [
  { value: 1, label: "Maize Rainfed" },
  { value: 2, label: "Tapiocca IRR" },
  { value: 3, label: "Cotton Rainfed" },
];

export const filterOptions: FilterModel[] = [
  {
    id: 1,
    value: "Maize Rainfed",
    categoryId: 1,
    isSelected: false,
  },
  {
    id: 2,
    value: "Tapiocca IRR",
    categoryId: 1,
    isSelected: false,
  },
  {
    id: 3,
    value: "Cotton Rainfed",
    categoryId: 1,
    isSelected: false,
  },
  {
    id: 4,
    value: "SF",
    categoryId: 2,
    isSelected: false,
  },
  {
    id: 5,
    value: "MF",
    categoryId: 2,
    isSelected: false,
  },
  {
    id: 6,
    value: "OF",
    categoryId: 2,
    isSelected: false,
  },
];

export const filterCategoryOptions = [
  { value: 1, label: "Crop Type" },
  { value: 2, label: "Farmer Type" },
];

export const ExcelMessage = {
  success: "Excel Downloaded Successfully",
  failed: "Excel Download Failed",
};

export const loanSnackBarMessage = {
  saveSuccess: "Loan Saved Successfully",
  failed: "Failed",
  deleteSuccess: "Loan Deleted Successfully",
  serviceDown: "Service Down. Please Run it and Refresh the browser",
};

export const getEmptyGuid = () => {
  return "00000000-0000-0000-0000-000000000000";
};
