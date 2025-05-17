import { Select, styled } from "@mui/material";

const CustomDropdown = styled(Select)({
  "& .MuiOutlinedInput-root": {
    height: 50,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 14px",
  },
});

export default CustomDropdown;
