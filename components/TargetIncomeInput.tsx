// TargetIncomeInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const TargetIncomeInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Target Quarterly Income</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value.toString()}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            onChange(parseInt(numericValue) || 0);
          }}
          placeholder="Enter target income"
          maxLength={10}
        />
      </View>
      {value > 0 && (
        <Text style={styles.formattedValue}>
          ${value.toLocaleString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  formattedValue: {
    marginTop: 4,
    color: '#666',
    fontSize: 14,
  },
});