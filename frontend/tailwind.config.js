/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx}"];
export const theme = {
    fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
        screens: {
            "1000px": "1050px",
            "1110px": "1110px",
            "800px": "800px",
            "1300px": "1300px",
            "400px": "400px",
        },
    },
};
export const plugins = [];
