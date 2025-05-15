# Known Bugs

## 1. Undefined Child Element in `sliderLight` Method

- **Description:**  
  The `childElement` was not properly validated, which could lead to runtime errors if it was `undefined`.

## 2. Undefined Background Element in `sliderLight` Method

- **Description:**  
  The `background` element was not properly validated, causing issues when it was `undefined`.

## 3. Slider Event Listener Duplication

- **Description:**  
  The slider's `input` event listener was being added multiple times, resulting in redundant event handling.

## 4. Incorrect Light Intensity Handling in `sliderLight`

- **Description:**  
  The slider value was not always synchronized with the `lightIntensity` property of the component.