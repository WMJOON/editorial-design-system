import type { Preview } from "@storybook/react-vite";
import "../editorial.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: "padded",
    a11y: { test: "todo" },
  },
  globalTypes: {
    theme: {
      description: "Editorial color mode",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [(Story, context) => {
    const theme = context.globals.theme === "dark" ? "dark" : "light";
    return <div className="storybook-canvas" data-editorial-theme={theme}><Story /></div>;
  }],
};

export default preview;
