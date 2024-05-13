import React, { RefObject } from 'react';
import { ViewStyle, TextStyle,TouchableOpacity } from 'react-native';

interface DropdownMenuProps {
    options: string[];
    renderButton?: (ref?: RefObject<TouchableOpacity>, toggleMenu?: () => void) => React.ReactNode;
    renderItem?: (closeMenu: () => void) => React.ReactNode;
    rightRenderIcon?: JSX.Element;
    leftRenderIcon?: JSX.Element;
    placeHolder?: string;
    onSelect?: (option: string, index: number) => void;
    disabled?: boolean;
    buttonStyle?: ViewStyle;
    placeHolderStyle?: TextStyle;
    optionStyle?: TextStyle;
    contentStyle?: ViewStyle;
    menuItemStyle?: ViewStyle;
    dropDownWidth?: number;
}

declare const DropdownMenu: React.FC<DropdownMenuProps>;

export default DropdownMenu;