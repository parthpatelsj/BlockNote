import { Mark } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textLanguage: {
      setTextLanguage: (language: string) => ReturnType;
    };
  }
}

export const TextLanguageMark = Mark.create({
  name: "textLanguage",

  addAttributes() {
    return {
      language: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("data-text-language"),
        renderHTML: (attributes) => ({
          "data-text-language": attributes.language,
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

          if (element.hasAttribute("data-text-language")) {
            return { language: element.getAttribute("data-text-language") };
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
      setTextLanguage:
        (language) =>
        ({ commands }) => {
          console.log("within setTextLanguage: ", language);
          if (language !== "default") {
            console.log(language);
            return commands.setContent("<p>" + language + "</p>");
          }

          return commands.setContent("<p>" + language + "</p>");
        },
    };
  },
});
