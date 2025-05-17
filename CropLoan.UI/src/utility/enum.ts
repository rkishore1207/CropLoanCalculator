const CropTypeEnum = {
  MaizeRainfed: 1,
  MaizeIrrigated: 2,
} as const;

type CropTypeEnum = (typeof CropTypeEnum)[keyof typeof CropTypeEnum];

export const getCropTypeEnumObject = (): Record<string, number> => {
  return { ...CropTypeEnum };
};

export default CropTypeEnum;
