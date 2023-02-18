import { Extension } from "@tiptap/core";
import { getBlockInfoFromPos } from "../Blocks/helpers/getBlockInfoFromPos";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockTextLocation: {
      setBlockTextLocation: (
        posInBlock: number,
        location: string
      ) => ReturnType;
    };
  }
}

export const TextLocationExtension = Extension.create({
  name: "blockTextLocation",

  addGlobalAttributes() {
    return [
      {
        types: ["blockContainer"],
        attributes: {
          textLocation: {
            default: "default",
            parseHTML: (element) =>
              element.hasAttribute("data-text-location")
                ? element.getAttribute("data-text-location")
                : "default",
            renderHTML: (attributes) =>
              attributes.textLocation !== "default" && {
                "data-text-location": attributes.textLocation,
              },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBlockTextLocation:
        (posInBlock, location) =>
        ({ state, view }) => {
          const blockInfo = getBlockInfoFromPos(state.doc, posInBlock);
          if (blockInfo === undefined) {
            return false;
          }

          state.tr.setNodeAttribute(
            blockInfo.startPos - 1,
            "textLocation",
            location
          );

          view.focus();

          return true;
        },
    };
  },
});
