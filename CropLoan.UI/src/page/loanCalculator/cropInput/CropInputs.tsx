/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styles from "./CropInput.module.css";
import TextInput from "../../../components/TextInput";
import CustomDropdown from "../../../components/CustomDropdown";
import { cropDropdownOptions } from "../../../utility/constants";
import { MenuItem } from "@mui/material";
import type { InputType } from "../../../utility/loanModel";

interface CropInputProps {
  handleCalculate: (value: InputType) => void;
}

const CropInputs = ({ handleCalculate }: CropInputProps) => {
  const [cropInput, setCropInput] = useState<InputType>({
    registerNubmber: "",
    customerName: "",
    loanNumber: "",
    cropType: 0,
    acre: 0,
  });
  const [cropTypes, setCropTypes] = useState<any>([]);

  useEffect(() => {
    setCropTypes(cropDropdownOptions);
  }, []);

  const handleCalculateClick = (value: any) => {
    if (!value.customerName || !value.cropType || !value.acre) {
      return;
    }
    handleCalculate(value);
    setCropInput({ ...cropInput, customerName: "", cropType: 0, acre: 0 });
  };

  return (
    <div className={`flexRow ${styles.userInputBody}`}>
      <div className={`flexColumn ${styles.customerItem}`}>
        <label htmlFor="loanAmount">Customer Name</label>
        <TextInput
          aria-label="customerName"
          placeholder="Enter Customer Name"
          className={styles.userInput}
          value={cropInput.customerName}
          onChange={(event: any) =>
            setCropInput({ ...cropInput, customerName: event.target.value })
          }
        />
      </div>
      <div className={`flexColumn ${styles.customerItem}`}>
        <label htmlFor="crop">Crop Type</label>
        <CustomDropdown
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={cropInput.cropType}
          onChange={(event) =>
            setCropInput({
              ...cropInput,
              cropType: Number(event.target.value),
            })
          }
          sx={{
            "& .MuiSelect-select": {
              color: "var(--color-c2cdd9)", // Placeholder color
            },
            width: "100%",
          }}
          displayEmpty
        >
          <MenuItem disabled value={0}>
            <em>Select Crop Type</em>
          </MenuItem>
          {cropTypes.map((cropType: any, index: number) => (
            <MenuItem key={index} value={cropType.value}>
              {cropType.label}
            </MenuItem>
          ))}
        </CustomDropdown>
      </div>
      <div className={`flexColumn ${styles.customerItem}`}>
        <label htmlFor="acre">Acre Quantity</label>
        <TextInput
          aria-label="customerName"
          placeholder="Enter Acre Quantity"
          type="number"
          className={styles.userInput}
          value={cropInput.acre}
          onChange={(event) => {
            const value = event.target.value;
            setCropInput({
              ...cropInput,
              acre: value === "" ? "" : Number(event.target.value),
            });
          }}
        />
      </div>
      <div className={`flexColumn ${styles.calculateButtonContainer}`}>
        <button
          className={styles.calculateButton}
          onClick={() => handleCalculateClick(cropInput)}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default CropInputs;
