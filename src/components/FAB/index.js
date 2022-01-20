import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FAB = ({iconProps, ...props}) => {
  return (
    <TouchableOpacity {...props}>
        <MaterialIcons {...iconProps} />
    </TouchableOpacity>
  );
}

export default FAB;