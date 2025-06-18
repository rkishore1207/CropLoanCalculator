// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Modal } from "@mui/material";
// import { filterCategoryOptions, filterOptions } from "../../utility/constants";
// import FilterItem from "./FilterItem/FilterItem";

// interface FilterModalProps {
//   open: boolean;
//   handleClose: () => void;
//   fetchLoansWithFilter?: (payload: any) => void;
// }

// const FilterModal = ({ open, handleClose }: FilterModalProps) => {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       disableEscapeKeyDown={false}
//       BackdropProps={{ onClick: handleClose }}
//     >
//       <div>
//         {/* <div>
//           {filterCategoryOptions?.length > 0 &&
//             filterCategoryOptions.map((item: any) => (
//               <FilterItem
//                 categoryName={item.label}
//                 filterOptions={filterOptions?.filter(
//                   (filter: any) => filter.typeId === item.value
//                 )}
//               />
//             ))}
//         </div> */}
//         <div>
//             <div>

//             </div>
//             <div>

//             </div>
//         </div>
//         <div>
//           <button onClick={handleClose}>Cancel</button>
//           <button>Apply</button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default FilterModal;
