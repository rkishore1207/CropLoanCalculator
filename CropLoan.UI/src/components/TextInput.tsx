import { styled, TextField } from "@mui/material";

const TextInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    borderBottom: "2px solid #1976d2",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    height: 50,
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      borderBottom: "2px solid #1565c0",
    },
    "&.Mui-focused": {
      borderBottom: "2px solid #004ba0",
    },
    padding: "0 5px",
  },
});

export default TextInput;
