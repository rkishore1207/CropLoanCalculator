import CropTypeEnum, { FarmerTypeEnum } from "./enum";
import type { CropInput } from "./loanModel";

export const CropType = (type: number): CropInput => {
  switch (type) {
    case CropTypeEnum.MaizeRainfed:
      return {
        name: "Maize Rainfed",
        fertilizer: 2100,
        seed: 1700,
        insecticide: 1200,
        amount: 20400,
      };
    case CropTypeEnum.TapioccaIRR:
      return {
        name: "Tapiocca IRR",
        fertilizer: 5050,
        seed: 1500,
        insecticide: 1500,
        amount: 25600,
      };
    case CropTypeEnum.CottonRainfed:
      return {
        name: "Cotton Rainfed",
        fertilizer: 2500,
        seed: 1900,
        insecticide: 1400,
        amount: 20000,
      };
    default: {
      return {
        name: "Maize Rainfed",
        fertilizer: 2100,
        seed: 1700,
        insecticide: 1200,
        amount: 20400,
      };
    }
  }
};

export const getFarmerType = (acre: number) => {
  if (acre > 0 && acre <= 2.5) {
    return { id: FarmerTypeEnum.SF, name: "MF" };
  } else if (acre > 2.5 && acre < 5) {
    return { id: FarmerTypeEnum.MF, name: "SF" };
  } else if (acre >= 5) {
    return { id: FarmerTypeEnum.OF, name: "OF" };
  }
};
