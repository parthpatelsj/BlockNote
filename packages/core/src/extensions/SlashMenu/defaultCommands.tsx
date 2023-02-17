import { SlashMenuItem } from "./SlashMenuItem";
import { Editor, Range } from "@tiptap/core";

/**
 * An array containing commands for creating all default blocks.
 */
const defaultCommands: { [key: string]: SlashMenuItem } = {
  // Command for creating a level 1 heading
  heading: new SlashMenuItem(
    "Heading",
    (editor: Editor, range: Range) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .BNCreateOrUpdateBlock(range.from, {
          type: "heading",
          props: {
            level: "1",
          },
        })
        .run();
    },
    ["h", "heading1", "h1"]
  ),

  // Command for creating a level 2 heading
  heading2: new SlashMenuItem(
    "Heading 2",
    (editor: Editor, range: Range) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .BNCreateOrUpdateBlock(range.from, {
          type: "heading",
          props: {
            level: "2",
          },
        })
        .run();
    },
    ["h2", "heading2", "subheading"]
  ),

  // Command for creating a level 3 heading
  subtopic: new SlashMenuItem(
    "Subtopic",
    (editor: Editor, range: Range) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .BNCreateOrUpdateBlock(range.from, {
          type: "subtopic",
        })
        .run();
    },
    ["subtopic"]
  ),

  // Command for creating an ordered list
  numberedList: new SlashMenuItem(
    "Numbered List",
    (editor: Editor, range: Range) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .BNCreateOrUpdateBlock(range.from, {
          type: "numberedListItem",
          props: {},
        })
        .run();
    },
    ["li", "list", "numberedlist", "numbered list"]
  ),

  // Command for creating a bullet list
  bulletList: new SlashMenuItem(
    "Bullet List",
    (editor: Editor, range: Range) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .BNCreateOrUpdateBlock(range.from, {
          type: "bulletListItem",
          props: {},
        })
        .run();
    },
    ["ul", "list", "bulletlist", "bullet list"]
  ),

  // Command for creating a paragraph (pretty useless)
  paragraph: new SlashMenuItem(
    "Paragraph",
    (editor: Editor, range: Range) => {
      return editor
        .chain()
        .focus()
        .deleteRange(range)
        .BNCreateOrUpdateBlock(range.from, {
          type: "paragraph",
          props: {},
        })
        .run();
    },
    ["p"]
  ),

  //     replaceRangeWithNode(editor, range, node);

  //     return true;
  //   },
  //   ["ol", "orderedlist"],
  //   OrderedListIcon,
  //   "Used to display an ordered (enumerated) list item"
  // ),

  // Command for creating a blockquote
  // blockquote: new SlashCommand(
  //   "Block Quote",
  //   CommandGroup.BASIC_BLOCKS,
  //   (editor, range) => {
  //     const paragraph = editor.schema.node("paragraph");
  //     const node = editor.schema.node(
  //       "blockquote",
  //       { "block-id": uniqueId.generate() },
  //       paragraph
  //     );

  //     replaceRangeWithNode(editor, range, node);

  //     return true;
  //   },
  //   ["quote", "blockquote"],
  //   QuoteIcon,
  //   "Used to make a quote stand out",
  //   "Ctrl+Shift+B"
  // ),

  // Command for creating a horizontal rule
  // horizontalRule: new SlashCommand(
  //   "Horizontal Rule",
  //   CommandGroup.BASIC_BLOCKS,
  //   (editor, range) => {
  //     const node = editor.schema.node("horizontalRule", {
  //       "block-id": uniqueId.generate(),
  //     });

  //     // insert horizontal rule, create a new block after the horizontal rule if applicable
  //     // and put the cursor in the block after the horizontal rule.
  //     editor
  //       .chain()
  //       .focus()
  //       .replaceRangeAndUpdateSelection(range, node)
  //       .command(({ tr, dispatch }) => {
  //         if (dispatch) {
  //           // the node immediately after the cursor
  //           const nodeAfter = tr.selection.$to.nodeAfter;

  //           // the position of the cursor
  //           const cursorPos = tr.selection.$to.pos;

  //           // check if there is no node after the cursor (end of document)
  //           if (!nodeAfter) {
  //             // create a new block of the default type (probably paragraph) after the cursor
  //             const { parent } = tr.selection.$to;
  //             const node = parent.type.contentMatch.defaultType?.create();

  //             if (node) {
  //               tr.insert(cursorPos, node);
  //             }
  //           }

  //           // try to put the cursor at the start of the node directly after the inserted horizontal rule
  //           tr.doc.nodesBetween(cursorPos, cursorPos + 1, (node, pos) => {
  //             if (node.type.name !== "horizontalRule") {
  //               tr.setSelection(TextSelection.create(tr.doc, pos));
  //             }
  //           });
  //         }

  //         return true;
  //       })
  //       .scrollIntoView()
  //       .run();
  //     return true;
  //   },
  //   ["hr", "horizontalrule"],
  //   SeparatorIcon,
  //   "Used to separate sections with a horizontal line"
  // ),

  // Command for creating a table
  // table: new SlashCommand(
  //   "Table",
  //   CommandGroup.BASIC_BLOCKS,
  //   (editor, range) => {
  //     editor.chain().focus().deleteRange(range).run();
  //     // TODO: add blockid, pending https://github.com/ueberdosis/tiptap/pull/1469
  //     editor
  //       .chain()
  //       .focus()
  //       .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
  //       .scrollIntoView()
  //       .run();
  //     return true;
  //   },
  //   ["table", "database"],
  //   TableIcon,
  //   "Used to create a simple table"
  // ),
};

export default defaultCommands;
