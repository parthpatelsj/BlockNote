import "@blocknote/core/style.css";
import React, { useState, useMemo, useEffect } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import styles from "./TopicCard.module.css";
import {
  Card,
  Image,
  Text,
  Badge,
  Input,
  Tabs,
  Group,
  Button,
  NativeSelect,
} from "@mantine/core";

const TopicCard = () => {
  const [topicLanguage, setTopicLanguage] = useState("en-us");

  const editor = useBlockNote({
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
      (window as WindowWithProseMirror).ProseMirror = editor; // Give tests a way to get editor instance
    },
    editorProps: {
      attributes: {
        class: styles.editor,
        "data-test": "editor",
      },
    },
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Input
          styles={{ wrapper: { width: "80%" } }}
          variant="default"
          required
          placeholder="Topic Title..."
        />
        {/* <Text weight={500}>Norway Fjord Adventures</Text> */}
        <NativeSelect
          value={topicLanguage}
          onChange={(event) => setTopicLanguage(event.currentTarget.value)}
          data={["en-us"]}
        />
        {/* <Badge color="gray" variant="light">
          en-us
        </Badge> */}
      </Group>
      <Tabs variant="pills" defaultValue="text" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="text">Text</Tabs.Tab>
          <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="text" pt="xs">
          <BlockNoteView editor={editor} />
        </Tabs.Panel>

        <Tabs.Panel value="gallery" pt="xs">
          Gallery Content
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default TopicCard;
