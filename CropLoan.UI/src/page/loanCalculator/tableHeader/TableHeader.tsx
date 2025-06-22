import styles from "./TableHeader.module.css";

const TableHeader = () => {
  return (
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
  );
};

export default TableHeader;
