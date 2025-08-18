/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip } from "@mui/material";
import TextInput from "../TextInput";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styles from "./PageItem.module.css";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "../../store/store";
import { setSelectedPage } from "../../store/LoanStore/loan.actions";
import { Fragment } from "react/jsx-runtime";

interface PageItemProps {
  uid: string;
  name: string;
  newPageUID: string;
  handlePageDelete: (uid: string) => void;
  onChangePageName: (uid: string, name: string) => void;
  handleSave: (uid: string) => void;
  selectedPage: string;
  handlePopupClose: () => void;
}

const PageItem = ({
  uid,
  name,
  newPageUID,
  handlePageDelete,
  onChangePageName,
  handleSave,
  selectedPage,
  handlePopupClose,
}: PageItemProps) => {
  const { isDuplicatePageName } = useSelector(
    (state: ReduxState) => state.loan
  );
  const dispatch = useDispatch();

  const handleDelete = (uid: string) => {
    if (selectedPage === uid) dispatch(setSelectedPage(""));
    handlePopupClose();
    handlePageDelete(uid);
  };

  return (
    <Fragment>
      {newPageUID === uid ? (
        <div className={`flexRow ${styles.newPage}`}>
          <TextInput
            aria-label="PageName"
            placeholder="Page Name"
            value={name}
            onChange={(event: any) => onChangePageName(uid, event.target.value)}
          />
          {isDuplicatePageName && <p>Please Provide Unique Page Name</p>}

          <span style={{ cursor: "pointer" }} onClick={() => handleSave(uid)}>
            <Tooltip title="Save" placement="top" arrow={true}>
              <SaveIcon
                className={
                  name?.trim() === "" ? styles.saveLoanDisable : styles.saveLoan
                }
                sx={{
                  color: name?.trim() === "" ? "#ccc" : "#000",
                }}
              />
            </Tooltip>
          </span>
        </div>
      ) : (
        <div
          className={`flexRow ${styles.pageItem} ${
            selectedPage === uid ? styles.activePageItem : ""
          }`}
        >
          <p
            className={styles.pageNameText}
            onClick={() => {
              dispatch(setSelectedPage(uid));
              handlePopupClose();
            }}
          >
            {name}
          </p>

          <span style={{ flex: 1 }} onClick={() => handleDelete(uid)}>
            <Tooltip title="Delete" placement="top" arrow={true}>
              <DeleteOutlineIcon className={styles.deleteLoan} />
            </Tooltip>
          </span>
        </div>
      )}
    </Fragment>
  );
};

export default PageItem;
