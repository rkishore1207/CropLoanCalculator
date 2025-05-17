import { useState } from "react";
import styles from "./LoanCalculator.module.css";
import { CropType } from "../../utility/helper";
import type { InputType, LoanAmount } from "../../utility/loanModel";
import CropInputs from "./cropInput/CropInputs";
import CropTable from "./cropTable/CropTable";
import { v4 as uuidv4 } from "uuid";

const LoanCalculator = () => {
  const [loanValues, setLoanValues] = useState<LoanAmount[]>([]);

  const handleCalculate = (cropInput: InputType) => {
    const { customerName, cropType, acre } = cropInput;
    const { fertilizer, seed, insecticide, amount, name } = CropType(cropType);

    const calculatedFertilizer = fertilizer * acre;
    const calculatedSeed = seed * acre;
    const calculatedInsecticide = insecticide * acre;
    const totalByProductsAmount =
      calculatedFertilizer + calculatedSeed + calculatedInsecticide;
    const readyCash = amount * acre - totalByProductsAmount;
    const totalAmount = readyCash + calculatedSeed + calculatedInsecticide + 0;

    const newLoanAmount: LoanAmount = {
      uid: uuidv4(),
      customerName: customerName,
      cropType: name,
      acre: acre,
      readyCash: readyCash,
      fertilizer: calculatedFertilizer,
      seed: calculatedSeed,
      insecticide: calculatedInsecticide,
      totalAmount: totalAmount,
      grandTotal: amount * acre,
      thozhuUram: 0,
    };

    setLoanValues((prevValues) => [...prevValues, newLoanAmount]);
  };

  const handleRemove = (uid: string) => {
    const updatedLoanValues = loanValues.filter(
      (loan: LoanAmount) => loan.uid !== uid
    );
    setLoanValues(updatedLoanValues);
  };

  return (
    <div className={styles.loanCalculatorBody}>
      <CropInputs handleCalculate={handleCalculate} />
      <CropTable loanValues={loanValues} handleRemove={handleRemove} />
    </div>
  );
};

export default LoanCalculator;
