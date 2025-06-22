/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./ConfirmPopup.module.css";
import CustomButton from "../CustomButton/CustomButton";

interface ConfirmPopupProps {
  canOpen: boolean;
  title: string;
  description: string;
  canShowCloseIcon: boolean;
  submitButtonName: string;
  titleIcon: any;
  navigateChanges: () => void;
  redirectChanges: () => void;
}

const ConfirmPopup = ({
  canOpen,
  canShowCloseIcon,
  title,
  description,
  submitButtonName,
  titleIcon,
  navigateChanges,
  redirectChanges,
}: ConfirmPopupProps) => {
  return (
    <div>
      <Modal open={canOpen}>
        <div className={styles.popUpBody}>
          <div className={`flexRow ${styles.titleRow}`}>
            <div>{titleIcon}</div>
            <p className={styles.titleText}>{title}</p>
            <div onClick={navigateChanges}>
              {canShowCloseIcon && <ClearIcon className={styles.popUpClose} />}
            </div>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={`flexRow ${styles.popUpFooter}`}>
            <CustomButton
              onClick={navigateChanges}
              name="Cancel"
              type="info"
              children="Cancel"
              className={styles.button}
            />
            <CustomButton
              onClick={redirectChanges}
              name={submitButtonName}
              type="error"
              children={submitButtonName}
              className={styles.button}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmPopup;
