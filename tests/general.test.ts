import General from "../src/general";

describe("General class", () => {
	let general: General;

	beforeEach(() => {
		general = new General();
	});

	test("should instantiate without errors", () => {
		expect(general).toBeInstanceOf(General);
	});

	test("should get a component by name", () => {
		const component = general.getComponent("hall");
		expect(component).toBeDefined();
		expect(component.name).toBe("hall");
	});

	// test("should get wifi connections", () => {
	// 	const wifi = general.getWifi();
	// 	expect(Array.isArray(wifi)).toBe(true);
	// 	expect(wifi.length).toBeGreaterThan(0);
	// });

	test("should capitalize first letter", () => {
		const textElement = document.createElement("span");
		general.updateMarkupValue(textElement, "hello");
		expect(textElement.textContent).toBe("hello");
	});

	test("should toggle, add, and remove hidden class", () => {
		const targetElement = document.createElement("div");
		general.addHidden(targetElement);
		expect(targetElement.classList.contains("hidden")).toBe(true);
		general.removeHidden(targetElement);
		expect(targetElement.classList.contains("hidden")).toBe(false);
		general.toggleHidden(targetElement);
		expect(targetElement.classList.contains("hidden")).toBe(true);
	});
});