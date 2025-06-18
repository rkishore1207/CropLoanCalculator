/* eslint-disable @typescript-eslint/no-explicit-any */
import DateFilter from "../DateFilter/DateFilter";
import styles from "./NavBar.module.css";
// import FilterModal from "../FilterModal/FilterModal";
import type { LoanAmount, LoanFilter } from "../../utility/loanModel";
import LoanService from "../../service/LoanService";
import { setLoanValues } from "../../store/LoanStore/loan.actions";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import type { ReduxState } from "../../store/store";

interface NavBarProps {
  insertNewRow: () => void;
}

const NavBar = ({ insertNewRow }: NavBarProps) => {
  // const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isAddButtonDisabled } = useSelector(
    (state: ReduxState) => state.loan
  );

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
    await LoanService.generateExcel()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div className={`flexRow ${styles.navBody}`}>
      <p className={styles.logoText}>Loan Calculator</p>
      <DateFilter fetchLoansWithFilter={getLoansWithFilter} />
      <div className={`flexRow ${styles.buttons}`}>
        <div onClick={handleExcelClick}>
          <DownloadSharpIcon sx={{ height: "35px", width: "35px" }} />
        </div>
        <div onClick={handleAddButtonClick}>
          <AddOutlinedIcon
            className={styles.addButton}
            sx={{
              height: "35px",
              width: "35px",
              color: isAddButtonDisabled ? "#ccc" : "#000",
              cursor: isAddButtonDisabled ? "not-allowed" : "pointer",
            }}
          />
        </div>
      </div>
      {/* <div
        onClick={() => setIsFilterClicked(true)}
        className={styles.filterIcon}
      >
        <FilterAltOutlinedIcon
          sx={{
            height: "35px",
            width: "35px",
          }}
        />
      </div> */}

      {/* {isFilterClicked && (
        <FilterModal
          open={isFilterClicked}
          handleClose={() => setIsFilterClicked(false)}
        />
      )} */}
    </div>
  );
};

export default NavBar;
