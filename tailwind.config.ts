import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    yellow: "#eab308", // Main accent
                    black: "#000000",
                    dark: "#18181b", // Zinc 900
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
