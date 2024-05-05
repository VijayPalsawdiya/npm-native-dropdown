import React from 'react';
import { View, Text, ViewStyle, TextStyle, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';

interface CustomModalComponentProps {
    isMenuOpen: boolean;
    setIsMenuOpen: () => void;
    viewRef: React.RefObject<View>;
    menuPosition?: { x: number, y: number };
    options?: string[];
    renderItem?: (closeMenu: () => void) => React.ReactNode;
    handleOptionPress: (option: string, index: number) => void;
    optionStyle?: TextStyle;
    selected?: string | false;
    menuItemStyle?: ViewStyle;
    contentStyle?: ViewStyle;
    dropDownWidth?: number
}

const CustomModalComponent: React.FC<CustomModalComponentProps> = ({
    isMenuOpen,
    setIsMenuOpen,
    viewRef,
    menuPosition = { x: 0, y: 0 },
    options = [],
    renderItem,
    handleOptionPress,
    optionStyle,
    selected,
    menuItemStyle,
    contentStyle,
    dropDownWidth=200
}) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isMenuOpen}
  
        >
            <Pressable style={$container} onPress={setIsMenuOpen}>
                <View ref={viewRef} style={[$menu, { top: menuPosition?.y + 20 || 0, left: menuPosition?.x || 0 }, contentStyle]}>
                    {renderItem
                        ? <ScrollView>{renderItem(setIsMenuOpen)}</ScrollView> :
                        <ScrollView>
                            {options?.map((option, index) => {
                                return (<TouchableOpacity
                                    key={index}
                                    onPress={() => handleOptionPress(option, index)}
                                    style={[$menuItem(!options[index + 1], option === selected,dropDownWidth), menuItemStyle]}
                                >
                                    <Text style={[$textStyle, optionStyle]}>{option} </Text>
                                </TouchableOpacity>)
                            })}
                        </ScrollView>}
                </View>
            </Pressable>
        </Modal>
    );
};

const $container: ViewStyle = {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}

const $menu: ViewStyle = {
    position: 'absolute',
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#71a5de',
    borderRadius: 3,
    zIndex: 2,
    maxHeight: 150,
    opacity: 0,
}
const $menuItem = (isLast: boolean, selected: boolean,dropDownWidth:number): ViewStyle => ({
    padding: 12,
    flex: 1,
    paddingVertical: 8,
    width: dropDownWidth || 200,
    borderBottomWidth: isLast ? 0 : 0.5,
    borderColor: 'gray',
    backgroundColor: selected ? '#d9d9d9' : '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
})

const $textStyle: TextStyle = {
    fontSize: 16,
    fontWeight: '400'
}

export default CustomModalComponent;
