const ColorPalette = {
    PRIMARY: "#3F73EC",
    SECONDARY: "#ba4c36",
    GRAY: "#CCC"
};

Object.defineProperty(ColorPalette, "values", {
    get: () => Object.values(ColorPalette)
});

Object.freeze(ColorPalette);

export default ColorPalette;