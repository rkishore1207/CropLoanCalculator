import CropTypeEnum from "./enum";
import type { CropInput } from "./loanModel";

export const CropType = (type: number): CropInput => {
  switch (type) {
    case CropTypeEnum.MaizeRainfed:
      return {
        name: "Maize Rainfed",
        fertilizer: 2100,
        seed: 1700,
        insecticide: 1200,
        amount: 25400,
      };
    default: {
      return {
        name: "Maize Irrigated",
        fertilizer: 1050,
        seed: 1400,
        insecticide: 2250,
        amount: 23000,
      };
    }
  }
};
