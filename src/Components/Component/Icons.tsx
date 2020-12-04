import React, {useState} from 'react';
import {baeminColor} from '~/Components/Styles/Colors';

import Icon from 'react-native-vector-icons/Ionicons';

interface IconProps {
  checkedValue: boolean;
}

const CheckIcon = ({checkedValue}: IconProps) => {
  return (
    <Icon
      name="md-checkmark-circle-sharp"
      color={checkedValue ? baeminColor : 'gray'}
      size={20}
    />
  );
};

export {CheckIcon};
