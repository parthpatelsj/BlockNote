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

  const updateFormData = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const { topicTitle, topicGallery } = formData;

  return (
    <form style={{ padding: "0 calc((100% - 731px) / 2)" }}>
      <button type="submit">Submit for Review</button>
      <button type="button">Save Draft</button>
      <button type="button">Cancel</button>
      <input
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
