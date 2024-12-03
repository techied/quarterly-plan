
// SalesPlannerScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import type {Stage} from './types'
import {styles} from './styles'
import {TargetIncomeInput} from './TargetIncomeInput'
import {StageInput} from './StageInput'
import {ResultsDisplay} from './ResultsDisplay'
import {calculateRequiredActivities} from './calculations'

export const SalesPlannerScreen: React.FC = () => {
  const [targetIncome, setTargetIncome] = useState(0);
  const [stages, setStages] = useState<Stage[]>([
    {
      id: uuid.v4(),
      name: 'Pitch',
      pricePerUnit: 0,
      conversionRate: 0.2,
      order: 0,
    },
    {
      id: uuid.v4(),
      name: 'Lead',
      pricePerUnit: 0,
      conversionRate: 0.3,
      order: 1,
    },
    {
      id: uuid.v4(),
      name: 'Close',
      pricePerUnit: 0,
      conversionRate: 0.75,
      order: 2,
    },
    {
      id: uuid.v4(),
      name: 'Install',
      pricePerUnit: 0,
      conversionRate: 1,
      order: 3,
    },
  ]);

  const addStage = () => {
    const newStage: Stage = {
      id: uuid.v4(),
      name: `Stage ${stages.length + 1}`,
      pricePerUnit: 0,
      conversionRate: 1,
      order: stages.length,
    };
    setStages([...stages, newStage]);
  };

  const removeStage = (stageId: string) => {
    setStages(prev => {
      const filtered = prev.filter(stage => stage.id !== stageId);
      // Reorder remaining stages
      return filtered.map((stage, index) => ({
        ...stage,
        order: index,
      }));
    });
  };

  const updateStage = (stageId: string, updates: Partial<Stage>) => {
    setStages(prev => 
      prev.map(stage => 
        stage.id === stageId ? { ...stage, ...updates } : stage
      )
    );
  };

  const results = calculateRequiredActivities(targetIncome, stages);

  return (
    <ScrollView style={styles.container}>
      <TargetIncomeInput
        value={targetIncome}
        onChange={setTargetIncome}
      />

      {stages
        .sort((a, b) => a.order - b.order)
        .map((stage) => (
          <StageInput
            key={stage.id}
            stage={stage}
            isLastStage={stage.order === stages.length - 1}
            onUpdate={(updates) => updateStage(stage.id, updates)}
            onRemove={() => removeStage(stage.id)}
          />
        ))}

      <Button title="Add Stage" onPress={addStage} />
      
      <ResultsDisplay results={results} stages={stages} />
    </ScrollView>
  );
};
