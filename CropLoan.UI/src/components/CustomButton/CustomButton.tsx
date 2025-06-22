/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";

interface CustomButtonProps {
  name: string;
  type?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  style?: any;
  disable?: boolean;
  onClick: () => void;
  children: any;
  className?: string;
}

const CustomButton = ({
  name,
  type = "primary",
  style,
  onClick,
  children,
  disable = false,
  className,
}: CustomButtonProps) => {
  return (
    <Button
      title={name}
      disabled={disable}
      color={type}
      variant="outlined"
      type="button"
      style={style}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
