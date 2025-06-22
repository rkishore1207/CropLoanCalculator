/* eslint-disable @typescript-eslint/no-explicit-any */
import DateFilter from "../DateFilter/DateFilter";
import styles from "./NavBar.module.css";
// import FilterModal from "../FilterModal/FilterModal";
import type {
  SnackBarModel,
  LoanAmount,
  LoanFilter,
} from "../../utility/loanModel";
import LoanService from "../../service/LoanService";
import { setLoanValues } from "../../store/LoanStore/loan.actions";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import type { ReduxState } from "../../store/store";
import { Fragment, useState } from "react";
import Loader from "../Loader/Loader";
import { Snackbar, Tooltip } from "@mui/material";
import { ExcelMessage } from "../../utility/constants";

interface NavBarProps {
  insertNewRow: () => void;
}

const NavBar = ({ insertNewRow }: NavBarProps) => {
  // const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isAddButtonDisabled } = useSelector(
    (state: ReduxState) => state.loan
  );
  const [excelSnackBar, setExcelSnackBar] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, isOpen, message } = excelSnackBar;

  const getLoansWithFilter = async (payload: LoanFilter) => {
    await LoanService.getLoansWithFilter(payload)
      .then((response: LoanAmount[]) => {
        dispatch(setLoanValues(response));
      })
      .catch((error: any) => {
        console.error("Error fetching loans with filter:", error);
      });
  };

  const handleAddButtonClick = () => {
    if (!isAddButtonDisabled) {
      insertNewRow();
    }
  };

  const handleExcelClick = async () => {
    setIsLoading(true);
    await LoanService.generateExcel()
      .then(() => {
        setIsLoading(false);
        setExcelSnackBar((prev: SnackBarModel) => ({
          ...prev,
          isOpen: true,
          message: ExcelMessage.success,
        }));
      })
      .catch(() => {
        setIsLoading(false);
        setExcelSnackBar((prev: SnackBarModel) => ({
          ...prev,
          isOpen: true,
          message: ExcelMessage.failed,
        }));
      });
  };

  return (
    <Fragment>
      <div className={`flexRow ${styles.navBody}`}>
        <p className={styles.logoText}>Loan Calculator</p>
        <DateFilter fetchLoansWithFilter={getLoansWithFilter} />
        <div className={`flexRow ${styles.buttons}`}>
          <div onClick={handleExcelClick}>
            <Tooltip title="Excel" placement="top" arrow={true}>
              <DownloadSharpIcon
                className={styles.exportButton}
                sx={{ height: "35px", width: "35px" }}
              />
            </Tooltip>
          </div>
          <div onClick={handleAddButtonClick}>
            <Tooltip title="Add Row" placement="top" arrow={true}>
              <AddOutlinedIcon
                className={styles.addButton}
                sx={{
                  height: "35px",
                  width: "35px",
                  color: isAddButtonDisabled ? "#ccc" : "#000",
                  cursor: isAddButtonDisabled ? "not-allowed" : "pointer",
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <Loader canShow={isLoading} />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={isOpen}
        autoHideDuration={2000}
        onClose={() =>
          setExcelSnackBar((prev: SnackBarModel) => ({
            ...prev,
            isOpen: false,
          }))
        }
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            {message === ExcelMessage.success ? (
              <DownloadSharpIcon color="success" sx={{ mr: 1 }} />
            ) : (
              <DownloadSharpIcon color="error" sx={{ mr: 1 }} />
            )}
            {message}
          </span>
        }
        key={vertical + horizontal}
      />
    </Fragment>
  );
};

export default NavBar;
