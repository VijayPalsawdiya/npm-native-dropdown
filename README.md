
# npm-native-dropdown

The npm-native-dropdown package provides a versatile and customizable dropdown component for React applications. With this package, you can easily integrate dropdown menus into your UI, offering users a seamless way to select options from a list.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Installation

Install my-project with npm

```bash
  npm install npm-native-dropdown
  cd my-project
```
or
```bash
  yarn add npm-native-dropdown
  cd my-project
```

## Features

- Easy to use
- Single or Multiselect option for items
- Responsive for Cross platform
- Have wast option for customization
- Implemented with typescript

## Screenshots

![App gif](https://github.com/VijayPalsawdiya/npm-native-dropdown/blob/main/src/assets/gif/dropdown.gif)


## Array example -

```javascript
  const options = [
    "Heart",
    "Thumbs Up",
    "Star",
    "Smiley",
  ];
```

## npm Import -
```bash
import DropdownMenu from 'npm-native-dropdown';
```

## Usage/Examples 1 - Simple 
```javascript
      <DropdownMenu
        placeHolder={selected ? selected : 'Select Option'}
        options={options}
        onSelect={(selectedItem: string, index: number) => {
          console.log('>>>', selectedItem, index);
        }}
      />
```

## Usage/Examples 2 - With renderitem and renderButton
```javascript
      <DropdownMenu
        options={options}
        onSelect={(selectedItem: string, index: number) => {
          console.log('>>>', selectedItem, index);
        }}
        renderButton={(buttonRef, toggleMenu) => {
          return (
            <TouchableOpacity style={[$button]} ref={buttonRef} onPress={toggleMenu}>
              <Text>{selected ? selected : 'Select'}</Text>
            </TouchableOpacity>
          )
        }}
        renderItem={(setIsMenuOpen: () => any) => {
          return options.map((option, index) => {
            return (<TouchableOpacity
              key={index}
              onPress={() => {setIsMenuOpen(),setSelected(option)}}
              style={[$menuItem(options?.length === index + 1)]}
            >
              <Text style={[$textStyle]}>{option} </Text>
            </TouchableOpacity>)
          })
        }}
      />
      
const $menuItem = (isLast: boolean): ViewStyle => ({
  padding: 12,
  flex: 1,
  paddingVertical: 8,
  width: 200,
  borderBottomWidth: isLast ? 0 : 0.5,
  borderColor: 'gray',
  alignItems: 'center'
})

const $textStyle: TextStyle = {
  fontSize: 16,
  fontWeight: '400',
  color: 'green'
}

const $button: TextStyle = {
  backgroundColor: '#e1ecf7',
  height: 44,
  width: 200,
  borderColor: '#71a5de',
  borderWidth: 1,
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'center',
}
```

## Usage/Examples 3 - With Icons 
#### (Note - You can use any JSX.Element) 
```javascript
      <DropdownMenu
        placeHolder={selected ? selected : 'Select Option'}
        options={options}
        onSelect={(selectedItem: string, index: number) => {
          console.log('>>>', selectedItem, index);
        }}
        leftRenderIcon={
          <Image
            style={$tinyLogo}
            source={{
              uri: 'https://image.png',
            }}
          />
        }
        rightRenderIcon={
          <Image
            style={$tinyLogo}
            source={{
              uri: 'https://image.png',
            }}
          />
        }
      />

const $tinyLogo: ImageStyle = {
  width: 20,
  height: 20,
}
```

## API Reference
#### Props

| Props     | Params   | isRequire  | Description                |
| :-------- | :------- | :--------- | :------------------------- |
| `options` | `string[]` | Yes         |  Plain array containing dropdown options.|
| `rightRenderIcon` | `ReactElement` | No         |  Custom component to be used as the dropdown icon.|
| `placeHolder` | `string` | No         |  Placeholder text when no option is selected.|
| `onSelect` | `(option: string, index: number) => void` | Yes         |  function recieves selected item and its index in data array|
| `disabled` | `boolean` | No         |  disable dropdown|
| `buttonStyle` | `ViewStyle` | No         |  style object for dropdown Button.|
| `placeHolderTextStyle` | `TextStyle` | No         |  style object for dropdown placeholder Text.|
| `contentStyle` | `ViewStyle` | No         |  style object for dropdown content.|
| `menuItemStyle` | `ViewStyle` | No         |  style object for dropdown menu items.|
| `optionStyle` | `TextStyle` | No         |  style object for dropdown options.|
| `leftRenderIcon` | `JSX.Element` | No         |  Custom component to be used as the dropdown icon.|
| `renderItem` | `JSX.Element` | No         |   React component for each dropdown item.|
| `renderButton` | `JSX.Element` | No         |  React component for the dropdown button.|
| `dropDownWidth` | `number` | No         |  dropdown width.|

## Author
- [@VijayPalsawdiya](https://github.com/VijayPalsawdiya)

## License
[MIT](https://choosealicense.com/licenses/mit/)
