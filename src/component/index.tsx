import React, { useState, useRef, useLayoutEffect, useEffect, ReactElement } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Pressable, ViewStyle, TextStyle } from 'react-native';
import CustomModalComponent from '../modal';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const STATUSBAR = 26;


interface DropdownMenuProps {
    options: string[];
    renderButton?: (ref?: React.RefObject<TouchableOpacity>, toggleMenu?: () => void) => ReactElement;
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

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    options = [],
    rightRenderIcon,
    placeHolder = 'Select',
    onSelect,
    disabled,
    buttonStyle,
    placeHolderStyle,
    contentStyle,
    menuItemStyle,
    optionStyle,
    leftRenderIcon,
    renderItem,
    renderButton,
    dropDownWidth=200,
}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selected, setSelected] = useState<string | false>(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const buttonRef = useRef<TouchableOpacity>(null);
    const viewRef = useRef<View>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOptionPress = (option: string, index: number) => {
        onSelect?.(option, index)
        setSelected(option);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (viewRef.current !== null) {
            viewRef?.current?.setNativeProps({
                opacity: 1,
            })
        }
    }, [menuPosition])

    useLayoutEffect(() => {
        if (buttonRef?.current && (isMenuOpen)) {
            buttonRef?.current?.measure((_x, _y, width, height, pageX, pageY) => {
                viewRef?.current?.measure(
                    (_viewRefX, _viewRefY, _viewRefWidth, viewRefHeight, _viewRefPageX, _viewRefPageY) => {
                        let tooltipX = pageX;
                        let tooltipY = pageY + STATUSBAR;
                        tooltipX = Math.max(0, Math.min(WIDTH - width, tooltipX));
                        if (HEIGHT < (pageY + height + viewRefHeight)) {
                            tooltipY = Math.max(0, Math.min(pageY - (viewRefHeight + STATUSBAR / 1.2), tooltipY));
                        } else {
                            tooltipY = Math.max(0, Math.min(HEIGHT - height, tooltipY));
                        }
                        setMenuPosition({ x: tooltipX, y: tooltipY });
                    },
                );
            });
        }

    }, [isMenuOpen]);

    const triggerComponent = () => {
        return (
            <>
                {renderButton ?
                    renderButton(buttonRef, toggleMenu)
                    :
                    <TouchableOpacity disabled={disabled} style={[$button(dropDownWidth), buttonStyle]} ref={buttonRef} onPress={toggleMenu}>
                        {leftRenderIcon ? leftRenderIcon : null}
                        <Text style={[$textStyle, placeHolderStyle]}>{selected ? selected : placeHolder}</Text>
                        {rightRenderIcon ? rightRenderIcon :
                            <Text style={$textStyle}>{isMenuOpen ? '▲' : '▼'}</Text>
                        }
                    </TouchableOpacity>
                }
            </>
        )
    }

    const renderModal = () => {
        return (
            <CustomModalComponent
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={() => setIsMenuOpen(false)}
                viewRef={viewRef}
                menuPosition={menuPosition}
                options={options}
                renderItem={renderItem}
                handleOptionPress={handleOptionPress}
                optionStyle={optionStyle}
                selected={selected}
                menuItemStyle={menuItemStyle}
                contentStyle={contentStyle}
                dropDownWidth={dropDownWidth}
            />
        )
    }

    return (
        <Pressable style={$container} onPress={() => setIsMenuOpen(false)}>
            {triggerComponent()}
            {renderModal()}
        </Pressable>
    );
};

const $container: ViewStyle = {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}

const $button =(dropDownWidth): TextStyle=> ({
    backgroundColor: '#e1ecf7',
    height: 44,
    width: dropDownWidth || 200,
    borderColor: '#71a5de',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
})

const $textStyle: TextStyle = {
    fontSize: 16,
    fontWeight: '400'
}



export default DropdownMenu;