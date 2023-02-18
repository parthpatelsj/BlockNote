import { Extension } from "@tiptap/core";
import { getBlockInfoFromPos } from "../Blocks/helpers/getBlockInfoFromPos";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockTextLanguage: {
      setBlockTextLanguage: (
        posInBlock: number,
        language: string
      ) => ReturnType;
    };
  }
}

export const TextLanguageExtension = Extension.create({
  name: "blockTextLanguage",

  addGlobalAttributes() {
    return [
      {
        types: ["blockContainer"],
        attributes: {
          textLanguage: {
            default: "default",
            parseHTML: (element) =>
              element.hasAttribute("data-text-language")
                ? element.getAttribute("data-text-language")
                : "default",
            renderHTML: (attributes) =>
              attributes.textLanguage !== "default" && {
                "data-text-language": attributes.textLanguage,
              },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBlockTextLanguage:
        (posInBlock, language) =>
        ({ state, view }) => {
          const blockInfo = getBlockInfoFromPos(state.doc, posInBlock);
          if (blockInfo === undefined) {
            return false;
          }

          state.tr.setNodeAttribute(
            blockInfo.startPos - 1,
            "textLanguage",
            language
          );

          view.focus();

          return true;
        },
    };
  },
});
