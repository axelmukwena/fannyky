import dynamic from "next/dynamic";

const Editor = function Editor() {
  return dynamic(
    // eslint-disable-next-line global-require
    () => require("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );
};

export default Editor;
