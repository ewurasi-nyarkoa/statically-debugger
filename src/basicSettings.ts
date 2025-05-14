'use strict'

import General from "./general.js";
let debounceTimeout: NodeJS.Timeout;

class Light extends General {
    constructor() {
        super();
    }

    notification (message: string) {
        return `
            <div class="notification">
                <div>
                    <img src="./assets/svgs/checked.svg" alt="checked svg icon on notifications" >
                </div>
                <p>${message}</p>
            </div>
        `;

    }

    displayNotification (message:string, position:InsertPosition, container:HTMLElement) {
        const html = this.notification(message);
        this.renderHTML(html, position, container);
    }

    removeNotification (element:HTMLElement) {
        setTimeout(() => {
            element.remove();
        }, 5000);
    }

    lightSwitchOn (lightButtonElement:HTMLElement) {
        lightButtonElement.setAttribute('src', './assets/svgs/light_bulb.svg');
        lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb_off.svg');
    }

    lightSwitchOff (lightButtonElement:HTMLElement) {
        lightButtonElement.setAttribute('src', './assets/svgs/light_bulb_off.svg');
        lightButtonElement.setAttribute('data-lightOn', './assets/svgs/light_bulb.svg');
    };

    lightComponentSelectors(lightButtonElement:HTMLElement) {
        const room = this.getSelectedComponentName(lightButtonElement) as string;
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

    toggleLightSwitch(lightButtonElement:HTMLElement) {
        const selectors = this.lightComponentSelectors(lightButtonElement);
        const { componentData: component, childElement, background } = selectors;
        const slider = this.closestSelector(lightButtonElement, '.rooms', '#light_intensity') as HTMLInputElement;
        if (!selectors.componentData) {
            console.error("Component data is undefined1.");
            return;
        }

        if (!component) return;

        component.isLightOn = !component.isLightOn;

        if (component.isLightOn) {
            this.lightSwitchOn(childElement as HTMLElement);
            component.lightIntensity = 5;
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background as HTMLElement , lightIntensity);
            slider.value = component.lightIntensity.toString();
        } else {
            this.lightSwitchOff(childElement as HTMLElement);
            this.handleLightIntensity(background as HTMLElement, 0);
            slider.value = (0).toString();
        }
    }
    // first bug

    handleLightIntensitySlider(element:HTMLElement, intensity:number) {
        const { componentData } = this.lightComponentSelectors(element);

        console.log(intensity);

        if (!componentData) {
            console.error("Component data is undefined2.");
            return;
        }

        if (typeof intensity !== 'number' || Number.isNaN(intensity)) return;

        componentData.lightIntensity = intensity; 
        
    
        const lightSwitch = this.closestSelector(element, '.rooms', '.light-switch');

        if (intensity === 0) {
            componentData.isLightOn = false;
            this.sliderLight(componentData.isLightOn, lightSwitch as HTMLElement);
            return;
        } else {
            componentData.isLightOn = false;
            this.sliderLight(componentData.isLightOn, lightSwitch as HTMLElement);
        }
    }

    sliderLight(isLightOn: boolean, lightButtonElement: HTMLElement) {
        const { componentData: component, childElement, background } = this.lightComponentSelectors(lightButtonElement);
        const slider = this.closestSelector(lightButtonElement, '.rooms', '#light_intensity') as HTMLInputElement;

        if (!component) {
           
            return;
        }

        if (isLightOn) {
            this.lightSwitchOn(childElement as HTMLElement);
            component.lightIntensity = component.lightIntensity || 5; 
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background as HTMLElement, lightIntensity);
            if (slider) slider.value = component.lightIntensity.toString(); 
        } else {
            this.lightSwitchOff(childElement as HTMLElement);
            this.handleLightIntensity(background as HTMLElement, 0);
            if (slider) slider.value = component.lightIntensity.toString(); 
        }

        // Add event listener to slider to allow manual adjustment of intensity
        if (slider && !slider.dataset.listenerAdded) {
            slider.addEventListener('input', (event) => {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                  const newIntensity = parseInt((event.target as HTMLInputElement).value, 10);
                  if (!isNaN(newIntensity)) {
                    component.lightIntensity = newIntensity;
                    const lightIntensity = newIntensity / 10;
                    this.handleLightIntensity(background as HTMLElement, lightIntensity);
                  }
                }, 50); // Small delay to smooth out rapid changes
              });   
        }

     
    }

}



export default Light;
