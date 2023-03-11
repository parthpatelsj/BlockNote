import "@blocknote/core/style.css";
import React, { useState, useMemo, useEffect } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import styles from "./TopicCard.module.css";
import { Card, Input, Tabs, Group, NativeSelect } from "@mantine/core";
import { useDropzone } from "react-dropzone";

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

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </section>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default TopicCard;
