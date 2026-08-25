import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      // This app renders project/profile images with plain <img> on purpose so the
      // markup matches the previous Vite build exactly. next/image would inject
      // srcset/sizing wrappers and change layout, so the rule stays off.
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[A-Z_]|^motion$",
          argsIgnorePattern: "^[A-Z_]|^_",
        },
      ],
    },
  },
];

export default eslintConfig;
