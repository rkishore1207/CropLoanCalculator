/* eslint-disable @typescript-eslint/no-explicit-any */
import DateFilter from "../DateFilter/DateFilter";
import styles from "./NavBar.module.css";
// import FilterModal from "../FilterModal/FilterModal";
import type {
  SnackBarModel,
  LoanAmount,
  LoanFilter,
  Page,
} from "../../utility/loanModel";
import LoanService from "../../service/LoanService";
import { setLoanValues, setPages } from "../../store/LoanStore/loan.actions";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import type { ReduxState } from "../../store/store";
import { Fragment, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Snackbar, Tooltip } from "@mui/material";
import { ExcelMessage } from "../../utility/constants";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import PagePopup from "./PagePopup/PagePopup";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

interface NavBarProps {
  insertNewRow: () => void;
  handleDeleteAll: (selectedPageUID: string) => void;
}

const NavBar = ({ insertNewRow, handleDeleteAll }: NavBarProps) => {
  // const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isAddButtonDisabled, canHideNavButtons, selectedPage, pages } =
    useSelector((state: ReduxState) => state.loan);
  const [excelSnackBar, setExcelSnackBar] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, isOpen, message } = excelSnackBar;
  const [isPageOpen, setIsPageOpen] = useState<boolean>(false);
  const [selectedPageName, setSelectedPageName] = useState<string>("");

  useEffect(() => {
    getPages();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      const page = pages?.find((x: Page) => x.uid === selectedPage) || {
        name: "",
        uid: "",
      };
      setSelectedPageName(page.name);
    }
  }, [selectedPage, pages]);

  const getPages = async () => {
    await LoanService.getPages()
      .then((response: Page[]) => {
        dispatch(setPages(response));
      })
      .catch((error: any) => {
        console.error("Error fetching loans with filter:", error);
      });
  };

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
    if (!isAddButtonDisabled && !canHideNavButtons) {
      insertNewRow();
    }
  };

  const handleExcelClick = async () => {
    setIsLoading(true);
    await LoanService.generateExcel(selectedPage)
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
        <div className={`flexRow ${styles.buttons}`}>
          <p className={styles.logoText}>Loan Calculator</p>
          <div onClick={() => setIsPageOpen(true)}>
            <Tooltip title="Page" placement="top" arrow={true}>
              <LaunchTwoToneIcon
                className={styles.exportButton}
                sx={{ height: "35px", width: "35px" }}
              />
            </Tooltip>
          </div>
          {selectedPage ? (
            <p className={styles.pageName}>{selectedPageName}</p>
          ) : (
            <div className={`flexRow ${styles.pageInfoMessage}`}>
              <InfoOutlineIcon sx={{ color: "#df0303" }} />
              <span className="errorMessage">Please Select a Page</span>
            </div>
          )}
        </div>
        <DateFilter fetchLoansWithFilter={getLoansWithFilter} />
        <div className={`flexRow ${styles.buttons}`}>
          {!canHideNavButtons && selectedPage && (
            <Fragment>
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
            </Fragment>
          )}
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
      {isPageOpen && (
        <PagePopup
          canOpen={isPageOpen}
          title="Select Page"
          titleIcon={<AddOutlinedIcon />}
          navigateChanges={() => setIsPageOpen(false)}
          canShowCloseIcon={true}
          handleDeleteAll={handleDeleteAll}
        />
      )}
    </Fragment>
  );
};

export default NavBar;
