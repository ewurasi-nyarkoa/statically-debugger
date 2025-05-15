'use strict'

import Light from './basicSettings.js';

declare var Chart: any

class AdvanceSettings extends Light {
    constructor() {
        super();
    }

    #markup(component: any) {
        const { name, numOfLights, autoOn, autoOff } = component;
        return `
        <div class="advanced_features">
            <h3>Advanced features</h3>
            <section class="component_summary">
                <div>
                    <p class="component_name">${this.capFirstLetter(name)}</p>
                    <p class="number_of_lights">${numOfLights}</p>
                </div>
                <div>
                    <p class="auto_on">
                        <span>Automatic turn on:</span>
                        <span>${autoOn}</span>
                    </p>
                    <p class="auto_off">
                        <span>Automatic turn off:</span>
                        <span>${autoOff}</span>
                    </p>
                </div>
            </section>
            <section class="customization">
                <div class="edit">
                    <p>Customize</p>
                    <button class="customization-btn">
                        <img src="./assets/svgs/edit.svg" alt="customize settings svg icon">
                    </button>
                </div>
                <section class="customization-details hidden">
                    <div>
                        <h4>Automatic on/off settings</h4>
                        <div class="defaultOn">
                            <label for="">Turn on</label>
                            <input type="time" name="autoOnTime" id="autoOnTime">
                            <div>
                                <button class="defaultOn-okay">Okay</button>
                                <button class="defaultOn-cancel">Cancel</button>
                            </div>
                        </div>
                        <div class="defaultOff">
                            <label for="">Go off</label>
                            <input type="time" name="autoOffTime" id="autoOffTime">
                            <div>
                                <button class="defaultOff-okay">Okay</button>
                                <button class="defaultOff-cancel">Cancel</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="summary">
                    <h3>Summary</h3>
                    <div class="chart-container">
                        <canvas id="myChart"></canvas>
                    </div>
                </section>
                <button class="close-btn">
                    <img src="./assets/svgs/close.svg" alt="close button svg icon">
                </button>
            </section>
            <button class="close-btn">
                <img src="./assets/svgs/close.svg" alt="close button svg icon">
            </button>
        </div>
        `;
    }

    #analyticsUsage(data: number[]) {
        const ctx = this.selector('#myChart') as HTMLCanvasElement;
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Hours of usage',
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    modalPopUp(element: HTMLElement) {
        const selectedRoom = this.getSelectedComponentName(element);
        if (!selectedRoom) return;

        const componentData = this.getComponent(selectedRoom);
        if (!componentData) return;

        const parentElement = this.selector('.advanced_features_container');
        if (!parentElement) return;

        this.removeHidden(parentElement as HTMLElement);
        this.renderHTML(this.#markup(componentData), 'afterbegin',parentElement as HTMLElement);
        this.#analyticsUsage(componentData['usage']);
    }

    displayCustomization(selectedElement: HTMLElement) {
        const element = this.closestSelector(selectedElement, '.customization', '.customization-details');
        if (element) {
            this.toggleHidden(element as HTMLElement);
        }
    }

    closeModalPopUp() {
        const parentElement = this.selector('.advanced_features_container');
        const childElement = this.selector('.advanced_features');

        childElement?.remove();
        if (parentElement) {
            this.addHidden(parentElement as HTMLElement);
        }
    }

    customizationCancelled(selectedElement: HTMLElement, parentSelectorIdentifier: string) {
        const element = this.closestSelector(selectedElement, parentSelectorIdentifier, 'input') as HTMLInputElement;
        if (element) {
            element.value = '';
        }9
    }

    customizeAutomaticOnPreset(selectedElement: HTMLElement) {
        try {
            const inputElement = this.closestSelector(selectedElement, '.defaultOn', 'input') as HTMLInputElement;
            if (!inputElement) {
                throw new Error('Input element not found');
            }

            const { value } = inputElement;
            if (!value) return;

            const component = this.getComponentData(inputElement, '.advanced_features', '.component_name');
            if (!component) {
                throw new Error('Component data not found');
            }

            component.autoOn = value;
            inputElement.value = '';

            const parentElement = inputElement.closest('.advanced_features');
            const spanElement = parentElement?.querySelector('.auto_on > span:last-child');
            if (spanElement) {
                this.updateMarkupValue(spanElement as HTMLElement, component.autoOn);
            }

            this.setComponentElement(component);
            this.automateLight(component['autoOn'], component);
        } catch (error) {
            console.error('Error in customizeAutomaticOnPreset:', error);
        }
    }

    customizeAutomaticOffPreset(selectedElement: HTMLElement) {
        try {
            const inputElement = this.closestSelector(selectedElement, '.defaultOff', 'input') as HTMLInputElement;
            if (!inputElement) {
                throw new Error('Input element not found');
            }

            const { value } = inputElement;
            if (!value) return;

            const component = this.getComponentData(inputElement, '.advanced_features', '.component_name');;
            if (!component) {
                throw new Error('Component data not found');
            }

            component.autoOff = value;
            inputElement.value = '';

            const parentElement = inputElement.closest('.advanced_features');
            const spanElement = parentElement?.querySelector('.auto_off > span:last-child');
            if (spanElement) {
                this.updateMarkupValue(spanElement as HTMLElement, component.autoOff);
            }

            this.setComponentElement(component);
            this.automateLight(component['autoOff'], component);
        } catch (error) {
            console.error('Error in customizeAutomaticOffPreset:', error);
        }
    }

    getComponentData(element: HTMLElement, ancestorIdentifier: string, childElement: string) {
        const parentElement = element.closest(ancestorIdentifier);
        if (!parentElement) {
            console.error(`Parent element with class "${ancestorIdentifier}" not found`);
            throw new Error(`Parent element with class "${ancestorIdentifier}" not found`);
        }

        const nameElement = parentElement.querySelector(childElement);
        if (!nameElement || !nameElement.textContent) {
            console.error(`Child element "${childElement}" not found or has no text content`);
            throw new Error(`Child element "${childElement}" not found or has no text content`);
        }

        const componentName = nameElement.textContent.toLowerCase().trim();
        const component = this.getSelectedComponent(componentName);
        if (!component) {
            console.error(`Component "${componentName}" not found`);
            throw new Error(`Component "${componentName}" not found`);
        }

        return component;
    }

    getSelectedComponent(componentName: string) {
        if (!componentName) {
            console.error('No component name provided');
            return null;
        }
        return this.componentsData[componentName.toLowerCase()];
    }

    getSelectedSettings(componentName: string) {
        const component = this.getSelectedComponent(componentName);
        return component ? this.#markup(component) : '';
    }

    setComponentElement(component: any) {
        if (!component || !component.name) {
            console.error('Invalid component data');
            return;
        }
        const componentName = component.name.toLowerCase();
        this.componentsData[componentName] = component;
    }

    setNewData(component: string, key: string, data: any) {
        const selectedComponent = this.componentsData[component.toLowerCase()];
        if (selectedComponent) {
            selectedComponent[key] = data;
        }
        return selectedComponent;
    }

    capFirstLetter(word: string): string {
        if (!word) return word;
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    formatTime(time: string) {
        if (!time) return null;
        
        const [hour, min] = time.split(':');
        if (!hour || !min) return null;

        const dailyAlarmTime = new Date();
        dailyAlarmTime.setHours(parseInt(hour));
        dailyAlarmTime.setMinutes(parseInt(min));
        dailyAlarmTime.setSeconds(0);
        
        return dailyAlarmTime;
    }

    timeDifference(selectedTime: string) {
        const now = new Date();
        const setTime = this.formatTime(selectedTime);
        return setTime ? setTime.getTime() - now.getTime() : 0;
    }

    async timer(time: Date, message: string, component: any) {
        return new Promise((resolve) => {
            const checkAndTriggerAlarm = () => {
                const now = new Date();
                
                if (
                    now.getHours() === time.getHours() &&
                    now.getMinutes() === time.getMinutes() &&
                    now.getSeconds() === time.getSeconds()
                ) {
                    resolve(this.toggleLightSwitch(component['element']));
                    clearInterval(intervalId);
                }
            }
        
            const intervalId = setInterval(checkAndTriggerAlarm, 1000);
        });
    }

    async automateLight(time: string, component: any) {
        const formattedTime = this.formatTime(time);
        if (!formattedTime) return;
        
        return await this.timer(formattedTime, "true", component);
    }
}

export default AdvanceSettings;