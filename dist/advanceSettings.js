'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AdvanceSettings_instances, _AdvanceSettings_markup, _AdvanceSettings_analyticsUsage;
import Light from './basicSettings.js';
class AdvanceSettings extends Light {
    constructor() {
        super();
        _AdvanceSettings_instances.add(this);
    }
    modalPopUp(element) {
        const selectedRoom = this.getSelectedComponentName(element);
        if (!selectedRoom)
            return;
        const componentData = this.getComponent(selectedRoom);
        if (!componentData)
            return;
        const parentElement = this.selector('.advanced_features_container');
        if (!parentElement)
            return;
        this.removeHidden(parentElement);
        this.renderHTML(__classPrivateFieldGet(this, _AdvanceSettings_instances, "m", _AdvanceSettings_markup).call(this, componentData), 'afterbegin', parentElement);
        __classPrivateFieldGet(this, _AdvanceSettings_instances, "m", _AdvanceSettings_analyticsUsage).call(this, componentData['usage']);
    }
    displayCustomization(selectedElement) {
        const element = this.closestSelector(selectedElement, '.customization', '.customization-details');
        if (element) {
            this.toggleHidden(element);
        }
    }
    closeModalPopUp() {
        const parentElement = this.selector('.advanced_features_container');
        const childElement = this.selector('.advanced_features');
        childElement === null || childElement === void 0 ? void 0 : childElement.remove();
        if (parentElement) {
            this.addHidden(parentElement);
        }
    }
    customizationCancelled(selectedElement, parentSelectorIdentifier) {
        const element = this.closestSelector(selectedElement, parentSelectorIdentifier, 'input');
        if (element) {
            element.value = '';
        }
        9;
    }
    customizeAutomaticOnPreset(selectedElement) {
        try {
            const inputElement = this.closestSelector(selectedElement, '.defaultOn', 'input');
            if (!inputElement) {
                throw new Error('Input element not found');
            }
            const { value } = inputElement;
            if (!value)
                return;
            const component = this.getComponentData(inputElement, '.advanced_features', '.component_name');
            if (!component) {
                throw new Error('Component data not found');
            }
            component.autoOn = value;
            inputElement.value = '';
            const parentElement = inputElement.closest('.advanced_features');
            const spanElement = parentElement === null || parentElement === void 0 ? void 0 : parentElement.querySelector('.auto_on > span:last-child');
            if (spanElement) {
                this.updateMarkupValue(spanElement, component.autoOn);
            }
            this.setComponentElement(component);
            this.automateLight(component['autoOn'], component);
        }
        catch (error) {
            console.error('Error in customizeAutomaticOnPreset:', error);
        }
    }
    customizeAutomaticOffPreset(selectedElement) {
        try {
            const inputElement = this.closestSelector(selectedElement, '.defaultOff', 'input');
            if (!inputElement) {
                throw new Error('Input element not found');
            }
            const { value } = inputElement;
            if (!value)
                return;
            const component = this.getComponentData(inputElement, '.advanced_features', '.component_name');
            ;
            if (!component) {
                throw new Error('Component data not found');
            }
            component.autoOff = value;
            inputElement.value = '';
            const parentElement = inputElement.closest('.advanced_features');
            const spanElement = parentElement === null || parentElement === void 0 ? void 0 : parentElement.querySelector('.auto_off > span:last-child');
            if (spanElement) {
                this.updateMarkupValue(spanElement, component.autoOff);
            }
            this.setComponentElement(component);
            this.automateLight(component['autoOff'], component);
        }
        catch (error) {
            console.error('Error in customizeAutomaticOffPreset:', error);
        }
    }
    getComponentData(element, ancestorIdentifier, childElement) {
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
    getSelectedComponent(componentName) {
        if (!componentName) {
            console.error('No component name provided');
            return null;
        }
        return this.componentsData[componentName.toLowerCase()];
    }
    getSelectedSettings(componentName) {
        const component = this.getSelectedComponent(componentName);
        return component ? __classPrivateFieldGet(this, _AdvanceSettings_instances, "m", _AdvanceSettings_markup).call(this, component) : '';
    }
    setComponentElement(component) {
        if (!component || !component.name) {
            console.error('Invalid component data');
            return;
        }
        const componentName = component.name.toLowerCase();
        this.componentsData[componentName] = component;
    }
    setNewData(component, key, data) {
        const selectedComponent = this.componentsData[component.toLowerCase()];
        if (selectedComponent) {
            selectedComponent[key] = data;
        }
        return selectedComponent;
    }
    capFirstLetter(word) {
        if (!word)
            return word;
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    formatTime(time) {
        if (!time)
            return null;
        const [hour, min] = time.split(':');
        if (!hour || !min)
            return null;
        const dailyAlarmTime = new Date();
        dailyAlarmTime.setHours(parseInt(hour));
        dailyAlarmTime.setMinutes(parseInt(min));
        dailyAlarmTime.setSeconds(0);
        return dailyAlarmTime;
    }
    timeDifference(selectedTime) {
        const now = new Date();
        const setTime = this.formatTime(selectedTime);
        return setTime ? setTime.getTime() - now.getTime() : 0;
    }
    timer(time, message, component) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const checkAndTriggerAlarm = () => {
                    const now = new Date();
                    if (now.getHours() === time.getHours() &&
                        now.getMinutes() === time.getMinutes() &&
                        now.getSeconds() === time.getSeconds()) {
                        resolve(this.toggleLightSwitch(component['element']));
                        clearInterval(intervalId);
                    }
                };
                const intervalId = setInterval(checkAndTriggerAlarm, 1000);
            });
        });
    }
    automateLight(time, component) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedTime = this.formatTime(time);
            if (!formattedTime)
                return;
            return yield this.timer(formattedTime, "true", component);
        });
    }
}
_AdvanceSettings_instances = new WeakSet(), _AdvanceSettings_markup = function _AdvanceSettings_markup(component) {
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
}, _AdvanceSettings_analyticsUsage = function _AdvanceSettings_analyticsUsage(data) {
    const ctx = this.selector('#myChart');
    if (!ctx)
        return;
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
};
export default AdvanceSettings;
