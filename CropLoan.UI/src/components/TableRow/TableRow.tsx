/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LoanAmount } from "../../utility/loanModel";
import CropTypeDropdown from "../CropTypeDropdown/CropTypeDropdown";
import TextInput from "../TextInput";
import styles from "./TableRow.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddButtonVisibility } from "../../store/LoanStore/loan.actions";
import { Tooltip } from "@mui/material";
import type { ReduxState } from "../../store/store";
import { loanSnackBarMessage } from "../../utility/constants";

interface TableRowProps {
  loanValue: LoanAmount;
  handleRemove: (uid: any) => void;
  selectedUID?: string;
  handleChange: (uid: string, propertyName: any, value: string) => void;
  handleCropTypeChange: (uid: string, propertyName: any, value: string) => void;
  handleSave: (uid: any) => void;
  handleAcreChange: (uid: any, acre: any, cropTypeId: any) => void;
  setSelectedUID: (uid: any) => void;
  handleFertilizerChange: (uid: any, value: any) => void;
  handleDelete: (uid: any) => void;
}

const TableRow = ({
  loanValue,
  handleRemove,
  selectedUID,
  handleChange,
  handleSave,
  handleCropTypeChange,
  handleAcreChange,
  setSelectedUID,
  handleFertilizerChange,
  handleDelete,
}: TableRowProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { isServiceDown } = useSelector((state: ReduxState) => state.loan);

  useEffect(() => {
    if (!isEdit) {
      if (
        loanValue.registerNumber &&
        loanValue.customerName &&
        loanValue.cropTypeId &&
        loanValue.acre
      )
        setIsSaveDisabled(false);
      else setIsSaveDisabled(true);
    }
  }, [loanValue, isEdit]);

  const handleSaveClick = (uid: any) => {
    if (isSaveDisabled) return;
    handleSave(uid);
    setSelectedUID("");
    setIsEdit(false);
    dispatch(setAddButtonVisibility(false));
  };

  return (
    <tr key={loanValue.uid}>
      {selectedUID === loanValue.uid ? (
        <td>
          <TextInput
            aria-label="RegisterNumber"
            placeholder="Reg.Num"
            className={styles.userInput}
            value={loanValue.registerNumber}
            onChange={(event: any) =>
              handleChange(loanValue.uid, "registerNumber", event.target.value)
            }
          />
        </td>
      ) : (
        <td title={loanValue.registerNumber?.toString()}>
          {loanValue.registerNumber}
        </td>
      )}
      {selectedUID === loanValue.uid ? (
        <td>
          <TextInput
            aria-label="customerName"
            placeholder="Name"
            className={styles.userInput}
            value={loanValue.customerName}
            onChange={(event: any) =>
              handleChange(loanValue.uid, "customerName", event.target.value)
            }
          />
        </td>
      ) : (
        <td title={loanValue.customerName}>{loanValue.customerName}</td>
      )}
      {selectedUID === loanValue.uid ? (
        <td>
          <TextInput
            aria-label="loanNumber"
            placeholder="Loan"
            className={styles.userInput}
            value={loanValue.loanNumber}
            onChange={(event: any) =>
              handleChange(loanValue.uid, "loanNumber", event.target.value)
            }
          />
        </td>
      ) : (
        <td title={loanValue.loanNumber?.toString()}>{loanValue.loanNumber}</td>
      )}
      {selectedUID === loanValue.uid ? (
        <td>
          <TextInput
            aria-label="accountNumber"
            placeholder="Account"
            className={styles.userInput}
            value={loanValue.accountNumber}
            onChange={(event: any) => {
              const input = event.target.value;
              if (/^\d{0,9}$/.test(input)) {
                handleChange(loanValue.uid, "accountNumber", input);
              }
            }}
            inputProps={{
              maxLength: 9,
              inputMode: "numeric",
            }}
          />
        </td>
      ) : (
        <td title={loanValue.accountNumber?.toString()}>
          {loanValue.accountNumber}
        </td>
      )}
      {selectedUID === loanValue.uid ? (
        <td>
          <CropTypeDropdown
            handleDropdownChange={handleCropTypeChange}
            value={loanValue.cropTypeId}
            uid={loanValue.uid}
          />
        </td>
      ) : (
        <td title={loanValue.cropTypeName}>{loanValue.cropTypeName}</td>
      )}
      {selectedUID === loanValue.uid ? (
        <td>
          <TextInput
            aria-label="acre"
            placeholder="Acre"
            className={styles.userInput}
            value={loanValue.acre}
            onChange={(event: any) =>
              handleChange(loanValue.uid, "acre", event.target.value)
            }
            onBlur={(event: any) =>
              handleAcreChange(
                loanValue.uid,
                event.target.value,
                loanValue.cropTypeId
              )
            }
          />
        </td>
      ) : (
        <td title={loanValue.acre.toString()}>{loanValue.acre}</td>
      )}
      <td title={loanValue.farmerType}>
        {loanValue.farmerType === "" ? "-" : loanValue.farmerType}
      </td>
      <td title={loanValue.readyCash?.toString()}>{loanValue.readyCash}</td>
      {isEdit ? (
        <td>
          <TextInput
            aria-label="Ferilizer"
            placeholder="Fertilizer"
            className={styles.userInput}
            value={loanValue.fertilizer}
            onChange={(event: any) =>
              handleChange(loanValue.uid, "fertilizer", event.target.value)
            }
            onBlur={(event: any) =>
              handleFertilizerChange(loanValue.uid, event.target.value)
            }
          />
        </td>
      ) : (
        <td title={loanValue.fertilizer?.toString()}>{loanValue.fertilizer}</td>
      )}
      <td title={loanValue.seed?.toString()}>{loanValue.seed}</td>
      <td title={loanValue.insecticide?.toString()}>{loanValue.insecticide}</td>
      <td title={loanValue.thozhuUram?.toString()}>{loanValue.thozhuUram}</td>
      <td title={loanValue.grandTotal?.toString()}>{loanValue.grandTotal}</td>
      <td title={loanValue.totalAmount?.toString()}>{loanValue.totalAmount}</td>
      {selectedUID === loanValue.uid || isEdit ? (
        <td>
          <span onClick={() => handleSaveClick(loanValue.uid)}>
            <Tooltip
              title={isServiceDown ? loanSnackBarMessage.serviceDown : "Save"}
              placement="top"
              arrow={true}
            >
              <SaveIcon
                className={
                  isSaveDisabled || isServiceDown
                    ? styles.saveLoanDisable
                    : styles.saveLoan
                }
                sx={{
                  color: isSaveDisabled || isServiceDown ? "#ccc" : "#000",
                }}
              />
            </Tooltip>
          </span>
        </td>
      ) : (
        <td>
          <span
            onClick={() => {
              setIsEdit(true);
              setIsSaveDisabled(false);
            }}
          >
            <Tooltip title="Edit" placement="top" arrow={true}>
              <EditIcon className={styles.editLoan} />
            </Tooltip>
          </span>
        </td>
      )}
      {selectedUID === loanValue.uid ? (
        <td>
          <span
            className={styles.remove}
            onClick={() => handleRemove(loanValue.uid)}
          >
            <Tooltip title="Remove" placement="top" arrow={true}>
              <ClearIcon className={styles.removeLoan} />
            </Tooltip>
          </span>
        </td>
      ) : (
        <td>
          <span
            className={styles.remove}
            onClick={() => handleDelete(loanValue.uid)}
          >
            <Tooltip title="Delete" placement="top" arrow={true}>
              <DeleteOutlineIcon className={styles.deleteLoan} />
            </Tooltip>
          </span>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
