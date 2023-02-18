import { Menu } from "@mantine/core";
import { TiTick } from "react-icons/ti";

export const LangLocalPicker = (props: {
  onClick?: () => void;
  textLanguage: string;
  setTextLanguage: (language: string) => void;
  textLocation: string;
  setTextLocation: (location: string) => void;
}) => {
  return (
    <>
      <Menu.Label>Language</Menu.Label>
      {["English", "French", "Spanish"].map((language) => (
        <Menu.Item
          onClick={() => {
            props.onClick && props.onClick();
            console.log(language);
            console.log(props.setTextLanguage);
            props.setTextLanguage(language);
          }}
          component={"div"}
          data-test={"text-language-" + language}
          key={"text-language-" + language}
          rightSection={
            props.textLanguage === language ? (
              <TiTick size={16} style={{ paddingLeft: "8px" }} />
            ) : (
              <div style={{ width: "24px", padding: "0" }} />
            )
          }>
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </Menu.Item>
      ))}
      <Menu.Label>Location</Menu.Label>
      {["Global", "UK", "USA", "London", "Robinsville", "San Jose"].map(
        (location) => (
          <Menu.Item
            onClick={() => {
              props.onClick && props.onClick();
              console.log(location);
              console.log(props.setTextLocation);
              props.setTextLocation(location);
            }}
            component={"div"}
            data-test={"text-location-" + location}
            key={"text-location-" + location}
            rightSection={
              props.textLocation === location ? (
                <TiTick size={16} style={{ paddingLeft: "8px" }} />
              ) : (
                <div style={{ width: "24px", padding: "0" }} />
              )
            }>
            {location.charAt(0).toUpperCase() + location.slice(1)}
          </Menu.Item>
        )
      )}
    </>
  );
};
