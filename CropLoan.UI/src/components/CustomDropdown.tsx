import { Select, styled } from "@mui/material";

const CustomDropdown = styled(Select)({
  "& .MuiOutlinedInput-root": {
    height: 50,
    display: "flex",
    alignItems: "center",
    border: "none",
    "& fieldset": {
      border: "none",
    },
    boxShadow: "none",
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 14px",
    border: "none",
    "& fieldset": {
      border: "none",
    },
    boxShadow: "none",
  },
});

export default CustomDropdown;
