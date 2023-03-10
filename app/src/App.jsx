import file from "./util/jsx-example";
import Editor from "./editor/index";
import DiffEditor from "./editor/diff-editor";
import { createSignal, onMount } from "solid-js";
import convert from "@sun-dock/core";

function App() {
  const [files, setFiles] = createSignal([]);
  const [error, setError] = createSignal(undefined);

  const onChange = (value) => {
    try {
      const result = convert.default(value);
      setFiles([value, result]);
      setError(undefined);
    } catch (e) {
      setError(e?.toString());
    }
  };

  onMount(() => onChange(file));

  return (
    <>
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "30px",
          width: "100%",
          "justify-content": "center",
        }}
      >
        <Editor
          file={() => file}
          onChange={onChange}
          title="初始代码"
          error={error}
        />
        <Editor file={files} readOnly={true} title="目标代码" />
        <DiffEditor files={files} title="Diff 结果" />
      </div>
      <footer style="text-align: center; padding: 14px"> Write with Solid.js </footer>
    </>
  );
}

export default App;
