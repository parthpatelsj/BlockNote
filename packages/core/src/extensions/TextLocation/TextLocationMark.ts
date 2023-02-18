import { Mark } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textLocation: {
      setTextLocation: (location: string) => ReturnType;
    };
  }
}

export const TextLocationMark = Mark.create({
  name: "textLocation",

  addAttributes() {
    return {
      location: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("data-text-location"),
        renderHTML: (attributes) => ({
          "data-text-location": attributes.location,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          if (typeof element === "string") {
            return false;
          }

          if (element.hasAttribute("data-text-location")) {
            return { color: element.getAttribute("data-text-location") };
          }

          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setTextLocation:
        (location) =>
        ({ commands }) => {
          console.log("within setTextLocation: ", location);
          if (location !== "default") {
            console.log(location);
            return commands.setContent(location);
          }

          return commands.setContent(location);
        },
    };
  },
});
