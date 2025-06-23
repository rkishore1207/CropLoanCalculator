/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import styles from "./LoanCalculator.module.css";
import type {
  DeletePopupModel,
  LoanAmount,
  SnackBarModel,
} from "../../utility/loanModel";
import { v4 as uuidv4 } from "uuid";
import TableRow from "../../components/TableRow/TableRow";
import { CropType, getFarmerType } from "../../utility/helper";
import LoanService from "../../service/LoanService";
import { useCallback } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "../../store/store";
import {
  setAddButtonVisibility,
  setLoanCopyValues,
  setLoanValues,
} from "../../store/LoanStore/loan.actions";
import TableHeader from "./tableHeader/TableHeader";
import ConfirmPopup from "../../components/ConfirmPopup/ConfirmPopup";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Snackbar } from "@mui/material";
import { loanSnackBarMessage } from "../../utility/constants";

const LoanCalculator = () => {
  const { loanValues, loanValuesCopy } = useSelector(
    (state: ReduxState) => state.loan
  );
  const dispatch = useDispatch();
  const [selectedUID, setSelectedUID] = useState<string>("");
  const [navBarHeight, setNavBarHeight] = useState<any>(null);
  const [tableHeaderHeight, setTableHeaderHeight] = useState<any>(null);
  const navBarRef = useRef<any>(null);
  const tableHeaderRef = useRef<any>(null);
  const [deletePopup, setDeletePopup] = useState<DeletePopupModel>({
    canShowDeletePopup: false,
    selectedUID: "",
  });
  const [loanSnackBar, setLoanSnackBar] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    vertical: "bottom",
    horizontal: "left",
  });
  const { vertical, horizontal, isOpen, message } = loanSnackBar;

  const deletePopupConfig = {
    title: "Delete Loan",
    titleIcon: <DeleteOutlineIcon color="error" />,
    description: "Are you sure, you want to delete this Loan",
    canShowCloseIcon: true,
    submitButtonName: "Delete",
  };

  useEffect(() => {
    const getLoans = async () => {
      await LoanService.getLoans()
        .then((response: LoanAmount[]) => {
          if (response?.length > 0) {
            dispatch(setLoanValues(response));
            dispatch(setLoanCopyValues(response));
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    getLoans();
  }, [dispatch]);

  useEffect(() => {
    // To calculate the height of the table container by subtracting the top nav bar's height
    if (navBarRef?.current) {
      const height = navBarRef?.current?.offsetHeight;
      setNavBarHeight(height);
    }

    // To calculate the height of the table body by subtracting the top nav bar's height and table header
    if (tableHeaderRef?.current) {
      const tableHeight = tableHeaderRef?.current?.offsetHeight;
      setTableHeaderHeight(tableHeight);
    }
  }, [navBarHeight, tableHeaderHeight]);

  const insertNewRow = useCallback(() => {
    const newUUID = uuidv4();
    setSelectedUID(newUUID);
    dispatch(setAddButtonVisibility(true));
    const newLoanAmount: LoanAmount = {
      uid: newUUID,
      registerNumber: "",
      customerName: "",
      loanNumber: "",
      cropTypeId: 0,
      cropTypeName: "",
      acre: 0,
      farmerTypeId: 0,
      farmerType: "",
      readyCash: 0,
      fertilizer: 0,
      seed: 0,
      insecticide: 0,
      totalAmount: 0,
      grandTotal: 0,
      thozhuUram: 0,
    };
    const updatedLoanValues = [newLoanAmount, ...loanValues];
    dispatch(setLoanValues(updatedLoanValues));
    dispatch(setLoanCopyValues(updatedLoanValues));
  }, [loanValues, dispatch]);

  useEffect(() => {
    const handleAddRow = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === "z" || event.key === "Z")) {
        event.preventDefault();
        if (selectedUID === "" || selectedUID === null) {
          insertNewRow();
        }
      }
    };

    window.addEventListener("keydown", handleAddRow);

    return () => {
      window.removeEventListener("keydown", handleAddRow);
    };
  }, [insertNewRow, selectedUID]);

  const handleAcreChange = (uid: any, acre: any, cropTypeId: any) => {
    const { fertilizer, seed, insecticide, amount } = CropType(cropTypeId);
    const farmer: any = getFarmerType(acre);

    const calculatedFertilizer = fertilizer * acre;
    const calculatedSeed = seed * acre;
    const calculatedInsecticide = insecticide * acre;
    const totalByProductsAmount =
      calculatedFertilizer + calculatedSeed + calculatedInsecticide;
    const readyCash = amount * acre;
    const totalAmount = readyCash + calculatedSeed + calculatedInsecticide;
    const calculatedGrandTotal = readyCash + totalByProductsAmount;

    const updatedLoanValues = loanValues?.map((loan: LoanAmount) =>
      loan.uid === uid
        ? {
            ...loan,
            registerNumber: loan.registerNumber,
            customerName: loan.customerName,
            acre: acre,
            cropTypeId: cropTypeId,
            farmerTypeId: farmer.id,
            farmerType: farmer.name,
            readyCash: Math.round(readyCash),
            fertilizer: Math.round(calculatedFertilizer),
            seed: Math.round(calculatedSeed),
            insecticide: Math.round(calculatedInsecticide),
            totalAmount: Math.round(totalAmount),
            grandTotal: Math.round(calculatedGrandTotal),
          }
        : loan
    );
    dispatch(setLoanValues(updatedLoanValues));
    dispatch(setLoanCopyValues(updatedLoanValues));
  };

  const handleFertilizerChange = (uid: any, fertilizerAmount: any) => {
    const currentLoanValue: LoanAmount | undefined = loanValuesCopy?.find(
      (loan: LoanAmount) => loan.uid === uid
    );
    const calculatedThozhuUram =
      (currentLoanValue?.fertilizer ?? 0) - fertilizerAmount;

    const updatedLoanValues = loanValues?.map((loan: LoanAmount) =>
      loan.uid === uid
        ? {
            ...loan,
            fertilizer: fertilizerAmount,
            thozhuUram:
              (currentLoanValue?.thozhuUram ?? 0) + calculatedThozhuUram,
            totalAmount:
              (currentLoanValue?.totalAmount ?? 0) + calculatedThozhuUram,
          }
        : loan
    );
    dispatch(setLoanValues(updatedLoanValues));
    dispatch(setLoanCopyValues(updatedLoanValues));
  };

  const handleRemove = (uid: string) => {
    const updatedLoanValues = loanValues.filter(
      (loan: LoanAmount) => loan.uid !== uid
    );
    setSelectedUID("");
    dispatch(setAddButtonVisibility(false));
    dispatch(setLoanValues(updatedLoanValues));
    dispatch(setLoanCopyValues(updatedLoanValues));
  };

  const handleDelete = async (uid: string) => {
    setDeletePopup((prev: DeletePopupModel) => ({
      ...prev,
      canShowDeletePopup: false,
      selectedUID: "",
    }));

    const updatedLoanValues = loanValues.filter(
      (loan: LoanAmount) => loan.uid !== uid
    );

    await LoanService.deleteLoan(uid)
      .then(() => {
        setSelectedUID("");
        setLoanSnackBar((prev: SnackBarModel) => ({
          ...prev,
          isOpen: true,
          message: loanSnackBarMessage.deleteSuccess,
        }));
        dispatch(setAddButtonVisibility(false));
        dispatch(setLoanValues(updatedLoanValues));
        dispatch(setLoanCopyValues(updatedLoanValues));
      })
      .catch((error: any) => {
        setLoanSnackBar((prev: SnackBarModel) => ({
          ...prev,
          isOpen: true,
          message: loanSnackBarMessage.failed,
        }));
        console.error("Error in Deleting data:", error);
      });
  };

  const handleChange = (uid: any, propertyName: string, value: any) => {
    const updatedLoanValues = loanValues?.map((loan: LoanAmount) =>
      loan.uid === uid ? { ...loan, [propertyName]: value } : loan
    );

    dispatch(setLoanValues(updatedLoanValues));
  };

  const handleCropTypeChange = (uid: any, propertyName: string, value: any) => {
    const { name } = CropType(value);
    const updatedLoanValues = loanValues?.map((loan: LoanAmount) =>
      loan.uid === uid
        ? { ...loan, [propertyName]: value, cropTypeName: name }
        : loan
    );
    dispatch(setLoanValues(updatedLoanValues));
  };

  const handleSave = async (uid: any) => {
    const loanValue: LoanAmount | undefined = loanValues?.find(
      (loan: LoanAmount) => loan.uid === uid
    );
    if (!loanValue) return;
    await LoanService.addOrUpdateLoan(loanValue)
      .then(() => {
        setLoanSnackBar((prev: SnackBarModel) => ({
          ...prev,
          isOpen: true,
          message: loanSnackBarMessage.saveSuccess,
        }));
      })
      .catch((error: any) => {
        setLoanSnackBar((prev: SnackBarModel) => ({
          ...prev,
          isOpen: true,
          message: loanSnackBarMessage.failed,
        }));
        console.error("Error saving data:", error);
      });
  };

  return (
    <div>
      <div ref={navBarRef}>
        <NavBar insertNewRow={insertNewRow} />
      </div>
      <div
        className={styles.tableContainer}
        style={{
          height: navBarHeight ? `calc(100vh - ${navBarHeight}px)` : "100vh",
        }}
      >
        <table className={styles.loanCalculatorTable} ref={tableHeaderRef}>
          <TableHeader />
        </table>
        <div
          className={styles.tableScroll}
          style={{
            height: tableHeaderHeight
              ? `calc(100vh - ${navBarHeight + tableHeaderHeight}px)`
              : "550px",
          }}
        >
          <table className={styles.loanCalculatorTable}>
            <tbody className={styles.tableBody}>
              {loanValues?.length > 0 ? (
                loanValues.map((loanValue: LoanAmount) => (
                  <TableRow
                    key={loanValue.uid}
                    selectedUID={selectedUID}
                    loanValue={loanValue}
                    handleRemove={handleRemove}
                    handleChange={handleChange}
                    handleCropTypeChange={handleCropTypeChange}
                    handleSave={handleSave}
                    handleAcreChange={handleAcreChange}
                    setSelectedUID={setSelectedUID}
                    handleFertilizerChange={handleFertilizerChange}
                    handleDelete={(uid: any) =>
                      setDeletePopup((prev: DeletePopupModel) => ({
                        ...prev,
                        canShowDeletePopup: true,
                        selectedUID: uid,
                      }))
                    }
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={11}
                    className={`flexRow ${styles.noDataAvailable}`}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {deletePopup.canShowDeletePopup && (
        <ConfirmPopup
          canOpen={deletePopup.canShowDeletePopup}
          description={deletePopupConfig.description}
          titleIcon={deletePopupConfig.titleIcon}
          submitButtonName={deletePopupConfig.submitButtonName}
          canShowCloseIcon={deletePopupConfig.canShowCloseIcon}
          title={deletePopupConfig.title}
          navigateChanges={() =>
            setDeletePopup((prev: DeletePopupModel) => ({
              ...prev,
              canShowDeletePopup: false,
              selectedUID: "",
            }))
          }
          redirectChanges={() => handleDelete(deletePopup.selectedUID)}
        />
      )}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={isOpen}
        autoHideDuration={2000}
        onClose={() =>
          setLoanSnackBar((prev: SnackBarModel) => ({
            ...prev,
            isOpen: false,
          }))
        }
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default LoanCalculator;
