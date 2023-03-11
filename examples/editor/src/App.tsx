// import logo from './logo.svg'
import "@blocknote/core/style.css";
import { useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import styles from "./App.module.css";
import TopicTitle from "./TopicHandler/TopicTitle";
import TopicCard from "./TopicCard/TopicCard";
import {
  Card,
  Image,
  Text,
  Badge,
  TextInput,
  Tabs,
  Group,
  Button,
} from "@mantine/core";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

function App() {
  const [{ items }, setItems] = useState({ items: [] });

  const addItem = () => {
    items.push(<TopicCard />);
    setItems({ items: [...items] });
  };

  return (
    <>
      {/* <TopicTitle /> */}
      <Button onClick={addItem}>+ Add New Topic</Button>
      {/* <TopicCard /> */}
      {items}
    </>
  );
}

export default App;
