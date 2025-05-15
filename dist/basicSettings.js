'use strict';
import General from "./general.js";
class Light extends General {
    constructor() {
        super();
    }
    notification(message) {
        return `
            <div class="notification">
                <div>
                    <img src="./assets/svgs/checked.svg" alt="checked svg icon on notifications" >
                </div>
                <p>${message}</p>
            </div>
        `;
    }
    displayNotification(message, position, container) {
        const html = this.notification(message);
        this.renderHTML(html, position, container);
    }
    removeNotification(element) {
        setTimeout(() => {
            element.remove();
        }, 5000);
    }
    lightSwitchOn(lightButtonElement) {
        lightButtonElement.setAttribute('src', './assets/svgs/light_bulb.svg');
        lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb_off.svg');
    }
    lightSwitchOff(lightButtonElement) {
        lightButtonElement.setAttribute('src', './assets/svgs/light_bulb_off.svg');
        lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb.svg');
    }
    ;
    lightComponentSelectors(lightButtonElement) {
        const room = this.getSelectedComponentName(lightButtonElement);
        if (!room) {
            return { room: null, componentData: null, childElement: null, background: null };
        }
        const componentData = this.getComponent(room);
        if (!componentData) {
            console.error(`Component data for room "${room}" is undefined.`);
        }
        const childElement = lightButtonElement.firstElementChild;
        const background = this.closestSelector(lightButtonElement, '.rooms', 'img');
        return { room, componentData, childElement, background };
    }
    toggleLightSwitch(lightButtonElement) {
        const selectors = this.lightComponentSelectors(lightButtonElement);
        const { componentData: component, childElement, background } = selectors;
        const slider = this.closestSelector(lightButtonElement, '.rooms', '#light_intensity');
        if (!selectors.componentData) {
            console.error("Component data is undefined1.");
            return;
        }
        if (!component)
            return;
        component.isLightOn = !component.isLightOn;
        if (component.isLightOn) {
            this.lightSwitchOn(childElement);
            component.lightIntensity = 5;
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background, lightIntensity);
            slider.value = component.lightIntensity.toString();
        }
        else {
            this.lightSwitchOff(childElement);
            this.handleLightIntensity(background, 0);
            slider.value = (0).toString();
        }
    }
    // first bug
    handleLightIntensitySlider(element, intensity) {
        const { componentData } = this.lightComponentSelectors(element);
        console.log(intensity);
        if (!componentData) {
            console.error("Component data is undefined2.");
            return;
        }
        if (typeof intensity !== 'number' || isNaN(intensity))
            return;
        componentData.lightIntensity = intensity;
        const lightSwitch = this.closestSelector(element, '.rooms', '.light-switch');
        if (intensity === 0) {
            componentData.isLightOn = false;
            this.sliderLight(componentData.isLightOn, lightSwitch);
            return;
        }
        else {
            componentData.isLightOn = true;
            this.sliderLight(componentData.isLightOn, lightSwitch);
        }
    }
    sliderLight(isLightOn, lightButtonElement) {
        const { componentData: component, childElement, background } = this.lightComponentSelectors(lightButtonElement);
        if (!component) {
            return;
        }
        if (isLightOn) {
            this.lightSwitchOn(childElement);
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background, lightIntensity);
        }
        else {
            this.lightSwitchOff(childElement);
            this.handleLightIntensity(background, 0);
        }
    }
}
export default Light;
