import type {Stage} from './types'
import {View,TextInput,Button, Text} from 'react-native'

import {styles} from './styles'


type StageInputProps = {
  stage: Stage;
  isLastStage: boolean;
  onUpdate: (updates: Partial<Stage>) => void;
  onRemove: () => void;
};

export const StageInput: React.FC<StageInputProps> = ({
  stage,
  isLastStage,
  onUpdate,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.nameInput}
          value={stage.name}
          onChangeText={(text) => onUpdate({ name: text })}
          placeholder="Stage Name"
        />
        {!isLastStage && (
          <Button title="Remove" onPress={onRemove} />
        )}
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text>Price Per Unit</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={stage.pricePerUnit.toString()}
            onChangeText={(text) => 
              onUpdate({ pricePerUnit: parseFloat(text) || 0 })
            }
          />
        </View>
        
        {!isLastStage && (
          <View style={styles.inputContainer}>
            <Text>Conversion Rate (%)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={(stage.conversionRate * 100).toString()}
              onChangeText={(text) => 
                onUpdate({ conversionRate: (parseFloat(text) || 0) / 100 })
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};