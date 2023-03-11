import { Extension } from "@tiptap/core";
import { PluginKey } from "prosemirror-state";
import { TopicInfoFactory } from "./TopicInfoFactoryTypes";
import { createTopicInfoPlugin } from "./TopicInfoPlugin";

/**
 * The menu that is displayed when selecting a piece of text.
 */
export const TopicInfoExtension = Extension.create<{
  formattingToolbarFactory: TopicInfoFactory;
}>({
  name: "FormattingToolbarExtension",

  addProseMirrorPlugins() {
    if (!this.options.formattingToolbarFactory) {
      throw new Error(
        "UI Element factory not defined for FormattingToolbarExtension"
      );
    }

    return [
      createTopicInfoPlugin({
        editor: this.editor,
        formattingToolbarFactory: this.options.formattingToolbarFactory,
        pluginKey: new PluginKey("FormattingToolbarPlugin"),
      }),
    ];
  },
});
