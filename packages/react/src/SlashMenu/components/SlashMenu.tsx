import { SlashMenuItem } from "@blocknote/core";
import { createStyles, Menu } from "@mantine/core";
import { SlashMenuItem as ReactSlashMenuItem } from "./SlashMenuItem";
import { formatKeyboardShortcut } from "../../utils";

export type SlashMenuProps = {
  items: SlashMenuItem[];
  keyboardHoveredItemIndex: number;
  itemCallback: (item: SlashMenuItem) => void;
};

const hints: Record<string, string> = {
  "Numbered List": "Used to display a numbered list",
  "Bullet List": "Used to display an unordered list",
  Paragraph: "Used for the body of your document",
  Subtopic: "Used for creating a section within a topic",
};

const shortcuts: Record<string, string> = {
  "Numbered List": formatKeyboardShortcut("Mod-Alt-7"),
  "Bullet List": formatKeyboardShortcut("Mod-Alt-8"),
  Paragraph: formatKeyboardShortcut("Mod-Alt-0"),
  Subtopic: formatKeyboardShortcut("Mod-Alt-9"),
};

export function SlashMenu(props: SlashMenuProps) {
  const { classes } = createStyles({ root: {} })(undefined, {
    name: "SlashMenu",
  });

  const blockDescriptor: SlashMenuItem[] = [];
  const basicBlockGroup: SlashMenuItem[] = [];

  for (const item of props.items) {
    if (item.name === "Subtopic") {
      blockDescriptor.push(item);
    }
    if (item.name === "Numbered List") {
      basicBlockGroup.push(item);
    }

    if (item.name === "Bullet List") {
      basicBlockGroup.push(item);
    }

    if (item.name === "Paragraph") {
      basicBlockGroup.push(item);
    }
  }

  const renderedItems: any[] = [];
  let index = 0;

  if (blockDescriptor.length > 0) {
    renderedItems.push(
      <Menu.Label key={"Blocks"}>{"Block Elements"}</Menu.Label>
    );

    for (const item of blockDescriptor) {
      renderedItems.push(
        <ReactSlashMenuItem
          key={item.name}
          name={item.name}
          hint={hints[item.name]}
          shortcut={shortcuts[item.name]}
          isSelected={props.keyboardHoveredItemIndex === index}
          set={() => props.itemCallback(item)}
        />
      );
      index++;
    }
  }

  if (basicBlockGroup.length > 0) {
    renderedItems.push(
      <Menu.Label key={"Basic Blocks Label"}>{"Basic Blocks"}</Menu.Label>
    );

    for (const item of basicBlockGroup) {
      renderedItems.push(
        <ReactSlashMenuItem
          key={item.name}
          name={item.name}
          hint={hints[item.name]}
          shortcut={shortcuts[item.name]}
          isSelected={props.keyboardHoveredItemIndex === index}
          set={() => props.itemCallback(item)}
        />
      );
      index++;
    }
  }

  return (
    <Menu
      /** Hacky fix to get the desired menu behaviour. The trigger="hover"
       * attribute allows focus to remain on the editor, allowing for suggestion
       * filtering. The closeDelay=10000000 attribute allows the menu to stay open
       * practically indefinitely, as normally hovering off it would cause it to
       * close due to trigger="hover".
       */
      defaultOpened={true}
      trigger={"hover"}
      closeDelay={10000000}>
      <Menu.Dropdown className={classes.root}>
        {renderedItems.length > 0 ? (
          renderedItems
        ) : (
          <Menu.Item>No match found</Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
