import "@blocknote/core/style.css";
import React, { useState, useMemo, useEffect } from "react";
import topicStyles from "./TopicTitle.module.css";
import { useDropzone } from "react-dropzone";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import styles from "../App.module.css";

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

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

const TopicTitle = () => {
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

  const [formData, setFormData] = useState({
    topicTitle: "",
    topicGallery: "",
  });

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

  const buttonStyle =
    "float: 'right'; margin: '0.8em'; padding: '1em'; border: '1px solid #e4e6e8'; border-radius: '5px'; cursor: 'pointer'; transition: '0.1s ease-in';";

  const updateFormData = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const { topicTitle, topicGallery } = formData;

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <form style={{ padding: "0 calc((100% - 731px) / 2)" }}>
      <button
        style={{
          float: "right",
          margin: "0.8em 0em 0.8em 0.8em",
          padding: "1em",
          border: "1px solid #e4e6e8",
          cursor: "pointer",
          transition: "0.1s ease-in",
          borderRadius: "5px",
        }}
        type="submit">
        Submit for Review
      </button>
      <button
        style={{
          float: "right",
          margin: "0.8em",
          padding: "1em",
          border: "1px solid #e4e6e8",
          cursor: "pointer",
          transition: "0.1s ease-in",
          borderRadius: "5px",
        }}
        type="button">
        Save Draft
      </button>
      <button
        style={{
          float: "right",
          margin: "0.8em",
          padding: "1em",
          border: "1px solid #e4e6e8",
          cursor: "pointer",
          transition: "0.1s ease-in",
          borderRadius: "5px",
        }}
        type="button">
        Cancel
      </button>
      <div
        style={{
          paddingTop: "5em",
        }}
      />
      <input
        type="text"
        className={topicStyles.topicTitle}
        placeholder="Enter topic here..."
      />
      <input
        type="text"
        className={topicStyles.topicHeader}
        placeholder="Header"
      />
      <input
        type="text"
        className={topicStyles.topicDescription}
        placeholder="Text"
      />
      {/* <input
        id="formTitle"
        style={{
          fontWeight: "bold",
          fontSize: "1em",
        }}
        value={topicTitle}
        onChange={(e) => updateFormData(e)}
        placeholder="Insert topic title here..."
        type="text"
        name="topicTitle"
        required
      /> */}
      <section className={topicStyles.dropzone}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Upload header image for this topic here...</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </form>
  );
};

export default TopicTitle;
