import type { LoanAmount } from "../../../utility/loanModel";
import styles from "./CropTable.module.css";
import ClearIcon from "@mui/icons-material/Clear";

interface CropTableProps {
  loanValues: LoanAmount[];
  handleRemove: (uid: string) => void;
}

const CropTable = ({ loanValues, handleRemove }: CropTableProps) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.loanCalculatorTable}>
        <thead className={styles.tableHeader}>
          <tr>
            <th title="Customer Name">Name</th>
            <th title="Crop Type">Crop Type</th>
            <th title="Acre">Acre</th>
            <th title="Ready Cash">Ready Cash</th>
            <th title="Fertilizer(Uram)">Fertilizer(Uram)</th>
            <th title="Seed (Vidhai)">Seed (Vidhai)</th>
            <th title="Insecticide(Poochi Marundhu)">
              Insecticide(Poochi Marundhu)
            </th>
            <th title="Thozhu Uram">Thozhu Uram</th>
            <th title="Grand Total">Grand Total</th>
            <th title="Total">Total</th>
            <th title="Remove">Remove</th>
          </tr>
        </thead>
      </table>
      <div className={styles.tableScroll}>
        <table className={styles.loanCalculatorTable}>
          <tbody className={styles.tableBody}>
            {loanValues?.length > 0 ? (
              loanValues.map((loanValue: LoanAmount) => (
                <tr key={loanValue.uid}>
                  <td title={loanValue.customerName}>
                    {loanValue.customerName}
                  </td>
                  <td title={loanValue.cropType}>{loanValue.cropType}</td>
                  <td title={loanValue.acre.toString()}>{loanValue.acre}</td>
                  <td title={loanValue.readyCash.toString()}>
                    {loanValue.readyCash}
                  </td>
                  <td title={loanValue.fertilizer.toString()}>
                    {loanValue.fertilizer}
                  </td>
                  <td title={loanValue.seed.toString()}>{loanValue.seed}</td>
                  <td title={loanValue.insecticide.toString()}>
                    {loanValue.insecticide}
                  </td>
                  <td title="">0</td>
                  <td title={loanValue.grandTotal.toString()}>
                    {loanValue.grandTotal}
                  </td>
                  <td title={loanValue.totalAmount.toString()}>
                    {loanValue.totalAmount}
                  </td>
                  <td
                    className={styles.remove}
                    onClick={() => handleRemove(loanValue.uid)}
                  >
                    <ClearIcon />
                  </td>
                </tr>
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
  );
};

export default CropTable;
