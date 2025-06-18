/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem } from "@mui/material";
import CustomDropdown from "../CustomDropdown";
import { useEffect, useState } from "react";
import { cropDropdownOptions } from "../../utility/constants";

interface CropTypeDropdown {
  handleDropdownChange: (uid: any, propertyName: any, value: any) => void;
  uid: any;
  value: any;
}

const CropTypeDropdown = ({
  handleDropdownChange,
  value,
  uid,
}: CropTypeDropdown) => {
  const [cropTypes, setCropTypes] = useState<any>([]);

  useEffect(() => {
    setCropTypes(cropDropdownOptions);
  }, []);

  return (
    <CustomDropdown
      labelId="demo-select-small-label"
      id="demo-select-small"
      value={value}
      onChange={(event) =>
        handleDropdownChange(uid, "cropTypeId", Number(event.target.value))
      }
      sx={{
        "& .MuiSelect-select": {
          color: "var(--color-c2cdd9)", // Placeholder color
        },
        width: "100%",
      }}
      displayEmpty
    >
      <MenuItem disabled value={0}>
        <em>Select Crop Type</em>
      </MenuItem>
      {cropTypes.map((cropType: any, index: number) => (
        <MenuItem key={index} value={cropType.value}>
          {cropType.label}
        </MenuItem>
      ))}
    </CustomDropdown>
  );
};

export default CropTypeDropdown;
