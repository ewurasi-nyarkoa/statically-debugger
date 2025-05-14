'use script'
// elements declarations
const homepageButton = document.querySelector('.entry_point') as HTMLButtonElement;
const homepage = document.querySelector('main') as HTMLElement;
const mainRoomsContainer = document.querySelector('.application_container') as HTMLElement;
const advanceFeaturesContainer = document.querySelector('.advanced_features_container') as HTMLElement;
const nav = document.querySelector('nav') as HTMLElement;
const loader = document.querySelector('.loader-container') as HTMLElement;

// imports
import Light from './basicSettings.js';
import AdvanceSettings from './advanceSettings.js';
import { elements } from 'chart.js';

// object creation
const lightController = new Light();
const advancedSettings = new AdvanceSettings();

// global variables
let selectedComponent;
let isWifiActive = true;

// Event handlers
// hide homepage after button is clicked
homepageButton?.addEventListener('click', function(e) {
    lightController.addHidden(homepage as HTMLElement);
    lightController.removeHidden(loader as HTMLElement);
    
    setTimeout(() => {
        lightController.removeHidden(mainRoomsContainer as HTMLElement);
        lightController.removeHidden(nav as HTMLElement);
    }, 1000);
})


mainRoomsContainer?.addEventListener('click', (e) => {
    const selectedElement = e.target;

    // when click occurs on light switch
    if ((selectedElement as Element)?.closest(".light-switch")) {
        const lightSwitch = (selectedElement as Element).closest(".basic_settings_buttons")?.firstElementChild;
        lightController.toggleLightSwitch(lightSwitch as HTMLElement);
        return;
    }

    // when click occurs on advance modal
    if ((selectedElement as Element)?.closest('.advance-settings_modal')) {
        const advancedSettingsBtn = (selectedElement as Element).closest('.advance-settings_modal');
        advancedSettings.modalPopUp(advancedSettingsBtn as HTMLElement);
        return;
    }
});

mainRoomsContainer?.addEventListener('change', (e) => {
    const slider = e.target as EventTarget | null;
    const value = parseFloat((slider as HTMLInputElement)?.value);
    lightController.handleLightIntensitySlider(slider as HTMLElement, value);
    
})
// advance settings modal
advanceFeaturesContainer?.addEventListener('click', (e) => {
    const selectedElement = e.target as HTMLElement;

    if ((selectedElement ).closest('.close-btn')) {
       advancedSettings.closeModalPopUp()
    }

    // display customization markup
    if ((selectedElement ).closest('.customization-btn')) {
        advancedSettings.displayCustomization(selectedElement as HTMLElement);
        return;
    }

    // set light on time customization
    if ((selectedElement ).matches('.defaultOn-okay')) {
        advancedSettings.customizeAutomaticOnPreset(selectedElement);
    }
    
    // set light off time customization
    if ((selectedElement ).matches('.defaultOff-okay')) {
        advancedSettings.customizeAutomaticOffPreset(selectedElement);
    }

    // cancel light time customization
    if (selectedElement?.textContent && selectedElement.textContent.includes("Cancel")) {
        if ((selectedElement ).matches('.defaultOn-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOn');
        } else if ((selectedElement ).matches('.defaultOff-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOff');
        }
    }
});

