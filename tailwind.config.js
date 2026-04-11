/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0f172a',
          card: '#1e293b',
          primary: '#f8fafc',
          secondary: '#94a3b8',
          accent: '#0ea5e9',
          'accent-hover': '#0284c7',
          border: '#334155',
          error: '#ef4444',
          success: '#22c55e',
        }
      },
    },
  },
  plugins: [],
}
