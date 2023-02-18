import { EditorElement, ElementFactory } from "../../shared/EditorElement";

export type BlockSideMenuStaticParams = {
  addBlock: () => void;
  deleteBlock: () => void;

  blockDragStart: (event: DragEvent) => void;
  blockDragEnd: () => void;

  freezeMenu: () => void;
  unfreezeMenu: () => void;

  setBlockTextColor: (color: string) => void;
  setBlockBackgroundColor: (color: string) => void;

  setBlockLocation: (location: string) => void;
  setBlockLanguage: (language: string) => void;
};

export type BlockSideMenuDynamicParams = {
  blockTextColor: string;
  blockBackgroundColor: string;
  blockLocation: string;
  blockLanguage: string;
  referenceRect: DOMRect;
};

export type BlockSideMenu = EditorElement<BlockSideMenuDynamicParams>;
export type BlockSideMenuFactory = ElementFactory<
  BlockSideMenuStaticParams,
  BlockSideMenuDynamicParams
>;
