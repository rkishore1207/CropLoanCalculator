/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@mui/material";
import styles from "./PagePopup.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import type { Page } from "../../../utility/loanModel";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "../../../store/store";
import {
  setDuplicatePageName,
  setPages,
} from "../../../store/LoanStore/loan.actions";
import PageItem from "../../PageItem/PageItem";
import { v4 as uuidv4 } from "uuid";
import LoanService from "../../../service/LoanService";
import { useLayoutEffect, useRef, useState } from "react";

interface PagePopupProps {
  canOpen: boolean;
  titleIcon: any;
  title: string;
  canShowCloseIcon: boolean;
  navigateChanges: () => void;
  handleDeleteAll: (pageUID: string) => void;
}

const PagePopup = ({
  canOpen,
  title,
  titleIcon,
  canShowCloseIcon,
  navigateChanges,
  handleDeleteAll,
}: PagePopupProps) => {
  const { pages, selectedPage } = useSelector(
    (state: ReduxState) => state.loan
  );
  const [newPageUID, setNewPageUID] = useState<string>("");
  const dispatch = useDispatch();
  const [titleHeight, setTitleHeight] = useState<number>(() => {
    return 68;
  });
  const titleRef = useRef<any>(null);

  useLayoutEffect(() => {
    if (!canOpen) return;

    if (titleRef.current) {
      setTitleHeight(titleRef.current.offsetHeight);
    }
  }, [canOpen]);

  const addNewPage = () => {
    //dispatch(setSelectedPage(""));
    const newUID = uuidv4();
    setNewPageUID(newUID);
    const pageObj: Page = {
      uid: newUID,
      name: "",
    };
    dispatch(setPages([pageObj, ...pages]));
  };

  const handlePageNameChange = (uid: string, name: string) => {
    dispatch(setDuplicatePageName(false));
    const updatedPages = pages?.map((page: Page) =>
      page.uid === uid
        ? {
            ...page,
            name: name || "",
          }
        : page
    );
    dispatch(setPages(updatedPages));
  };

  const handleSave = async (uid: string) => {
    const page = pages?.find((x: Page) => x.uid === uid) || {
      uid: "",
      name: "",
    };

    const updatedPage = {
      ...page,
      name: page.name?.trim() || "",
    };

    await LoanService.addOrUpdatePage(updatedPage)
      .then(() => {
        setNewPageUID("");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handlePopupClose = () => {
    setNewPageUID("");
    const updatedPages = pages?.filter((page: Page) => page.name !== "");
    dispatch(setPages(updatedPages));
    navigateChanges();
  };

  return (
    <div>
      <Modal open={canOpen}>
        <div className={styles.popUpBody}>
          <div className={`flexRow ${styles.titleRow}`} ref={titleRef}>
            <div onClick={addNewPage}>{titleIcon}</div>
            <p className={styles.titleText}>{title}</p>
            <div onClick={handlePopupClose}>
              {canShowCloseIcon && <ClearIcon />}
            </div>
          </div>
          <div
            className={`flexColumn ${styles.popupContent}`}
            style={{ height: `calc(600px - ${titleHeight}px)` }}
          >
            {pages?.length > 0 &&
              pages.map((page: Page) => (
                <PageItem
                  selectedPage={selectedPage}
                  newPageUID={newPageUID}
                  uid={page.uid}
                  name={page.name}
                  handlePageDelete={handleDeleteAll}
                  onChangePageName={handlePageNameChange}
                  handleSave={handleSave}
                  handlePopupClose={handlePopupClose}
                />
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PagePopup;
