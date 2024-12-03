import type {Stage} from './types'
export const calculateValuePerStage = (
  stageIndex: number,
  stages: Stage[],
): number => {
  const currentStage = stages[stageIndex];
  
  // Base case: last stage (typically "install")
  if (stageIndex === stages.length - 1) {
    return currentStage.pricePerUnit;
  }

  // Calculate value from current stage
  let value = currentStage.pricePerUnit;

  // Add cascading value from subsequent stages
  let cumulativeConversion = 1;
  for (let i = stageIndex + 1; i < stages.length; i++) {
    const laterStage = stages[i];
    cumulativeConversion *= stages[i - 1].conversionRate;
    value += cumulativeConversion * laterStage.pricePerUnit;
  }

  return value;
};

export const calculateRequiredActivities = (
  targetIncome: number,
  stages: Stage[],
) => {
  return stages.map((_, index) => {
    const valuePerUnit = calculateValuePerStage(index, stages);
    const required = targetIncome / valuePerUnit;
    return {
      stageId: stages[index].id,
      valuePerUnit,
      required,
    };
  });
};

