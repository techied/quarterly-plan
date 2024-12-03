
// ResultsDisplay.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateRequiredActivities ,} from './calculations';
import {Stage} from './types'

import {styles} from './styles'

type ResultsDisplayProps = {
  results: ReturnType<typeof calculateRequiredActivities>;
  stages: Stage[];
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results, 
  stages 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Required Activity</Text>
      {results.map((result) => {
        const stage = stages.find(s => s.id === result.stageId)!;
        return (
          <View key={stage.id} style={styles.resultRow}>
            <Text>Required {stage.name}s: {Math.ceil(result.required)}</Text>
            <Text>Value Per {stage.name}: ${result.valuePerUnit.toFixed(2)}</Text>
          </View>
        );
      })}
    </View>
  );
};
