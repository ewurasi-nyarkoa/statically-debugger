'use script';
// elements declarations
const homepageButton = document.querySelector('.entry_point');
const homepage = document.querySelector('main');
const mainRoomsContainer = document.querySelector('.application_container');
const advanceFeaturesContainer = document.querySelector('.advanced_features_container');
const nav = document.querySelector('nav');
const loader = document.querySelector('.loader-container');
// imports
import Light from './basicSettings.js';
import AdvanceSettings from './advanceSettings.js';
// object creation
const lightController = new Light();
const advancedSettings = new AdvanceSettings();
// global variables
let selectedComponent;
let isWifiActive = true;
// Event handlers
// hide homepage after button is clicked
homepageButton === null || homepageButton === void 0 ? void 0 : homepageButton.addEventListener('click', function (e) {
    lightController.addHidden(homepage);
    lightController.removeHidden(loader);
    setTimeout(() => {
        lightController.removeHidden(mainRoomsContainer);
        lightController.removeHidden(nav);
    }, 1000);
});
mainRoomsContainer === null || mainRoomsContainer === void 0 ? void 0 : mainRoomsContainer.addEventListener('click', (e) => {
    var _a;
    const selectedElement = e.target;
    // when click occurs on light switch
    if (selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.closest(".light-switch")) {
        const lightSwitch = (_a = selectedElement.closest(".basic_settings_buttons")) === null || _a === void 0 ? void 0 : _a.firstElementChild;
        lightController.toggleLightSwitch(lightSwitch);
        return;
    }
    // when click occurs on advance modal
    if (selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.closest('.advance-settings_modal')) {
        const advancedSettingsBtn = selectedElement.closest('.advance-settings_modal');
        advancedSettings.modalPopUp(advancedSettingsBtn);
        return;
    }
});
mainRoomsContainer === null || mainRoomsContainer === void 0 ? void 0 : mainRoomsContainer.addEventListener('change', (e) => {
    const slider = e.target;
    const value = parseFloat(slider === null || slider === void 0 ? void 0 : slider.value);
    lightController.handleLightIntensitySlider(slider, value);
});
// advance settings modal
advanceFeaturesContainer === null || advanceFeaturesContainer === void 0 ? void 0 : advanceFeaturesContainer.addEventListener('click', (e) => {
    const selectedElement = e.target;
    if ((selectedElement).closest('.close-btn')) {
        advancedSettings.closeModalPopUp();
    }
    // display customization markup
    if ((selectedElement).closest('.customization-btn')) {
        advancedSettings.displayCustomization(selectedElement);
        return;
    }
    // set light on time customization
    if ((selectedElement).matches('.defaultOn-okay')) {
        advancedSettings.customizeAutomaticOnPreset(selectedElement);
    }
    // set light off time customization
    if ((selectedElement).matches('.defaultOff-okay')) {
        advancedSettings.customizeAutomaticOffPreset(selectedElement);
    }
    // cancel light time customization
    if ((selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.textContent) && selectedElement.textContent.includes("Cancel")) {
        if ((selectedElement).matches('.defaultOn-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOn');
        }
        else if ((selectedElement).matches('.defaultOff-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOff');
        }
    }
});
