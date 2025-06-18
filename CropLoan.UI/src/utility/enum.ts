const CropTypeEnum = {
  MaizeRainfed: 1,
  TapioccaIRR: 2,
  CottonRainfed: 3,
} as const;

type CropTypeEnum = (typeof CropTypeEnum)[keyof typeof CropTypeEnum];

export const getCropTypeEnumObject = (): Record<string, number> => {
  return { ...CropTypeEnum };
};

export default CropTypeEnum;

export const FarmerTypeEnum = {
  SF: 1,
  MF: 2,
  OF: 3,
};
