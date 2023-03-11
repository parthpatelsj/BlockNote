import { EditorElement, ElementFactory } from "../../shared/EditorElement";
import { Block, BlockUpdate } from "../Blocks/apiTypes";

export type TopicInfoStaticParams = {
  setTopicTitle: (title: string) => void;

  updateBlock: (blockUpdate: BlockUpdate) => void;
};

export type TopicInfoDynamicParams = {
  topicTitle: string;
  block: Block;

  referenceRect: DOMRect;
};

export type TopicInfo = EditorElement<TopicInfoDynamicParams>;
export type TopicInfoFactory = ElementFactory<
  TopicInfoStaticParams,
  TopicInfoDynamicParams
>;
