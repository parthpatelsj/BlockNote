import { mergeAttributes, Node } from "@tiptap/core";
import styles from "../../Block.module.css";

export const SubtopicBlockContent = Node.create({
  name: "subtopic",
  group: "blockContent",
  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "h3",
        priority: 200,
        node: "blockContainer",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: styles.blockContent,
        "data-content-type": this.name,
      }),
      ["h3", 0],
    ];
  },
});
