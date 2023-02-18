import React, { useState, useMemo } from "react";
import "./TopicTitle.module.css";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const TopicTitle = () => {
  const [formData, setFormData] = useState({
    topicTitle: "",
    topicGallery: "",
  });

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] } });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const buttonStyle =
    "float: 'right'; margin: '0.8em'; padding: '1em'; border: '1px solid #e4e6e8'; border-radius: '5px'; cursor: 'pointer'; transition: '0.1s ease-in';";

  const updateFormData = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const { topicTitle, topicGallery } = formData;

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
      <input
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
      />
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a cover image for the topic here</p>
        </div>
      </div>
    </form>
  );
};

export default TopicTitle;
