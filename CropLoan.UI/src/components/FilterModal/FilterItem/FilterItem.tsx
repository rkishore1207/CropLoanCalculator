// /* eslint-disable @typescript-eslint/no-explicit-any */
// import type { FilterModel } from "../../../utility/loanModel";
// import styles from "./FilterItem.module.css";

// interface FilterItemProps {
//   categoryName: string;
//   filterOptions: FilterModel[];
// }

// const FilterItem = ({ categoryName, filterOptions }: FilterItemProps) => {
//   return (
//     <div className={styles.filterItemBody}>
//       <p>{categoryName}</p>
//       {filterOptions?.length > 0 &&
//         filterOptions.map((option: FilterModel) => (
//           <div key={option.value} className={styles.filterOption}>
//             <input
//               type="radio"
//               id={`${categoryName}-${option.value}`}
//               name={categoryName}
//               value={option.isSelected ? option.value : ""}
//               //onChange={}
//             />
//             <label htmlFor={`${categoryName}-${option.value}`}>
//               {option.value}
//             </label>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default FilterItem;
