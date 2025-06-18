/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styles from "./LoanCalculator.module.css";
import type { LoanAmount } from "../../utility/loanModel";
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

const LoanCalculator = () => {
  const { loanValues, loanValuesCopy } = useSelector(
    (state: ReduxState) => state.loan
  );
  const dispatch = useDispatch();
  const [selectedUID, setSelectedUID] = useState<string>("");

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
            thozhuUram: calculatedThozhuUram < 0 ? 0 : calculatedThozhuUram,
            totalAmount:
              calculatedThozhuUram < 0
                ? currentLoanValue?.totalAmount ?? 0
                : (currentLoanValue?.totalAmount ?? 0) + calculatedThozhuUram,
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
    const updatedLoanValues = loanValues.filter(
      (loan: LoanAmount) => loan.uid !== uid
    );

    await LoanService.deleteLoan(uid)
      .then(() => {
        setSelectedUID("");
        dispatch(setAddButtonVisibility(false));
        dispatch(setLoanValues(updatedLoanValues));
        dispatch(setLoanCopyValues(updatedLoanValues));
      })
      .catch((error: any) => {
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
      .then(() => {})
      .catch((error: any) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div>
      <NavBar insertNewRow={insertNewRow} />
      <div className={styles.tableContainer}>
        <table className={styles.loanCalculatorTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th title="Register Number">Register Number</th>
              <th title="Customer Name">Name</th>
              <th title="Loan Number">Loan Number</th>
              <th title="Crop Type">Crop Type</th>
              <th title="Acre">Acre</th>
              <th title="Farmer Type">Farmer Type</th>
              <th title="Ready Cash">Ready Cash</th>
              <th title="Fertilizer(Uram)">Fertilizer</th>
              <th title="Seed (Vidhai)">Seed</th>
              <th title="Insecticide(Poochi Marundhu)">Insecticide</th>
              <th title="Thozhu Uram">Thozhu Uram</th>
              <th title="Grand Total">Grand Total</th>
              <th title="Total">Total</th>
              <th title="Save">Save</th>
              <th title="Remove">Remove</th>
            </tr>
          </thead>
        </table>
        <div className={styles.tableScroll}>
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
                    handleDelete={handleDelete}
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
    </div>
  );
};

export default LoanCalculator;
