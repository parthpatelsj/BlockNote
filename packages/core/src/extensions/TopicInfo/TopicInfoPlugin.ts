import {
  Editor,
  isNodeSelection,
  isTextSelection,
  posToDOMRect,
} from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Block, BlockUpdate } from "../Blocks/apiTypes";
import { getBlockInfoFromPos } from "../Blocks/helpers/getBlockInfoFromPos";
import {
  TopicInfo,
  TopicInfoDynamicParams,
  TopicInfoFactory,
  TopicInfoStaticParams,
} from "./TopicInfoFactoryTypes";

// Same as TipTap bubblemenu plugin, but with these changes:
// https://github.com/ueberdosis/tiptap/pull/2596/files
export interface TopicInfoPluginProps {
  pluginKey: PluginKey;
  editor: Editor;
  topcInfoFactory: TopicInfoFactory;
  shouldShow?:
    | ((props: {
        editor: Editor;
        view: EditorView;
        state: EditorState;
        oldState?: EditorState;
        from: number;
        to: number;
      }) => boolean)
    | null;
}

export type TopicInfoViewProps = TopicInfoPluginProps & {
  view: EditorView;
};

export class TopicInfoView {
  public editor: Editor;

  public view: EditorView;

  public topicInfo: TopicInfo;

  public preventHide = false;

  public preventShow = false;

  public toolbarIsOpen = false;

  public shouldShow: Exclude<TopicInfoPluginProps["shouldShow"], null> = ({
    view,
    state,
    from,
    to,
  }) => {
    const { doc, selection } = state;
    const { empty } = selection;

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock =
      !doc.textBetween(from, to).length && isTextSelection(state.selection);

    return !(!view.hasFocus() || empty || isEmptyTextBlock);
  };

  constructor({
    editor,
    topicInfoFactory,
    view,
    shouldShow,
  }: TopicInfoViewProps) {
    this.editor = editor;
    this.view = view;

    this.topicInfo = topicInfoFactory(this.getStaticParams());

    if (shouldShow) {
      this.shouldShow = shouldShow;
    }

    this.view.dom.addEventListener("mousedown", this.viewMousedownHandler);
    this.view.dom.addEventListener("mouseup", this.viewMouseupHandler);
    this.view.dom.addEventListener("dragstart", this.dragstartHandler);

    this.editor.on("focus", this.focusHandler);
    this.editor.on("blur", this.blurHandler);
  }

  viewMousedownHandler = () => {
    this.preventShow = true;
  };

  viewMouseupHandler = () => {
    this.preventShow = false;
    setTimeout(() => this.update(this.editor.view));
  };

  dragstartHandler = () => {
    this.formattingToolbar.hide();
    this.toolbarIsOpen = false;
  };

  focusHandler = () => {
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view));
  };

  blurHandler = ({ event }: { event: FocusEvent }) => {
    if (this.preventHide) {
      this.preventHide = false;

      return;
    }

    if (
      event?.relatedTarget &&
      this.formattingToolbar.element?.parentNode?.contains(
        event.relatedTarget as Node
      )
    ) {
      return;
    }

    if (this.toolbarIsOpen) {
      this.formattingToolbar.hide();
      this.toolbarIsOpen = false;
    }
  };

  update(view: EditorView, oldState?: EditorState) {
    const { state, composing } = view;
    const { doc, selection } = state;
    const isSame =
      oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

    if (composing || isSame) {
      return;
    }

    // support for CellSelections
    const { ranges } = selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    const shouldShow = this.shouldShow?.({
      editor: this.editor,
      view,
      state,
      oldState,
      from,
      to,
    });

    // Checks if menu should be shown.
    if (
      !this.toolbarIsOpen &&
      !this.preventShow &&
      (shouldShow || this.preventHide)
    ) {
      this.formattingToolbar.render(this.getDynamicParams(), true);
      this.toolbarIsOpen = true;

      // TODO: Is this necessary? Also for other menu plugins.
      // Listener stops focus moving to the menu on click.
      this.formattingToolbar.element!.addEventListener("mousedown", (event) =>
        event.preventDefault()
      );

      return;
    }

    // Checks if menu should be updated.
    if (
      this.toolbarIsOpen &&
      !this.preventShow &&
      (shouldShow || this.preventHide)
    ) {
      this.formattingToolbar.render(this.getDynamicParams(), false);
      return;
    }

    // Checks if menu should be hidden.
    if (
      this.toolbarIsOpen &&
      !this.preventHide &&
      (!shouldShow || this.preventShow)
    ) {
      this.formattingToolbar.hide();
      this.toolbarIsOpen = false;

      // Listener stops focus moving to the menu on click.
      this.formattingToolbar.element!.removeEventListener(
        "mousedown",
        (event) => event.preventDefault()
      );

      return;
    }
  }

  destroy() {
    this.view.dom.removeEventListener("mousedown", this.viewMousedownHandler);
    this.view.dom.removeEventListener("mouseup", this.viewMouseupHandler);
    this.view.dom.removeEventListener("dragstart", this.dragstartHandler);

    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }

  getSelectionBoundingBox() {
    const { state } = this.editor.view;
    const { selection } = state;

    // support for CellSelections
    const { ranges } = selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    if (isNodeSelection(selection)) {
      const node = this.editor.view.nodeDOM(from) as HTMLElement;

      if (node) {
        return node.getBoundingClientRect();
      }
    }

    return posToDOMRect(this.editor.view, from, to);
  }

  getStaticParams(): TopicInfoStaticParams {
    return {
      setTopicTitle: (title: string) => {},
      updateBlock: (blockUpdate: BlockUpdate) => {
        this.editor.view.focus();
        this.editor.commands.BNUpdateBlock(
          this.editor.state.selection.from,
          blockUpdate
        );
      },
    };
  }

  getDynamicParams(): TopicInfoDynamicParams {
    const blockInfo = getBlockInfoFromPos(
      this.editor.state.doc,
      this.editor.state.selection.from
    )!;

    return {
      topicTitle: "Bhagwan Swaminarayan",
      // Needs type cast as there is no way to create a type that dynamically updates based on which extensions are
      // loaded by the editor.
      block: {
        type: blockInfo.contentType.name,
        props: blockInfo.contentNode.attrs,
      } as Block,
      referenceRect: this.getSelectionBoundingBox(),
    };
  }
}

export const createTopicInfoPlugin = (options: TopicInfoPluginProps) => {
  return new Plugin({
    key: new PluginKey("FormattingToolbarPlugin"),
    view: (view) => new FormattingToolbarView({ view, ...options }),
  });
};
