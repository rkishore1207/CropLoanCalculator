/* eslint-disable @typescript-eslint/no-explicit-any */
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import styles from "./DateFilter.module.css";
import { useSelector } from "react-redux";
import type { ReduxState } from "../../store/store";
import type { LoanFilter } from "../../utility/loanModel";
import dayjs from "dayjs";

interface DateFilterProps {
  fetchLoansWithFilter: (payload: LoanFilter) => void;
}

const DateFilter = ({ fetchLoansWithFilter }: DateFilterProps) => {
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const { loanFilter } = useSelector((state: ReduxState) => state.loan);

  const handleFromDateChange = (newValue: any) => {
    setFromDate(newValue);
    if (toDate) {
      const payload: LoanFilter = {
        date: {
          fromDate: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
          toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
        },
        cropTypeId: loanFilter.cropTypeId,
        farmerTypeId: loanFilter.farmerTypeId,
      };
      fetchLoansWithFilter(payload);
    }
  };

  const handleToDateChange = (newValue: any) => {
    setToDate(newValue);
    if (fromDate) {
      console.log("To date changed:", newValue, fromDate);
      const payload: LoanFilter = {
        date: {
          fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
          toDate: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
        },
        cropTypeId: loanFilter.cropTypeId,
        farmerTypeId: loanFilter.farmerTypeId,
      };
      fetchLoansWithFilter(payload);
    }
  };

  return (
    <div className={`flexRow ${styles.dateFilterBody}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="From date"
            value={fromDate}
            onChange={(newValue) => handleFromDateChange(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="To date"
            value={toDate}
            onChange={(newValue) => handleToDateChange(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DateFilter;
