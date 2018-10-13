const ColorPalette = {
    PRIMARY: "#36a4ba",
    SECONDARY: "#ba4c36",
    GRAY: "#9fa1a1"
};

Object.defineProperty(ColorPalette, "values", {
    get: () => Object.values(ColorPalette)
});

Object.freeze(ColorPalette);

export default ColorPalette;