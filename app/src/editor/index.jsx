import style from "./editor.module.css";
import { onMount, onCleanup, createSignal, createEffect, on } from "solid-js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const Editor = (props) => {
  const [editor, setEditor] = createSignal(null);
  let monacoEl;

  onMount(() => {
    let content = "";
    if (typeof props.file() !== "string") {
      content = props.file()[1];
    } else content = props.file();

    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return;

        return monaco.editor.create(monacoEl, {
          value: content ?? "",
          language: "javascript",
          readOnly: !!props.readOnly,
          theme: "vsc",
        });
      });
    }

    if (editor()) {
      editor()
        .getModel()
        .onDidChangeContent(() => props.onChange?.(editor().getValue()));

      editor().getAction("editor.action.formatDocument").run();
    }

    onCleanup(() => editor()?.dispose());
  });

  createEffect(
    on(props.file, (v) => {
      if (typeof props.file() !== "string") editor().setValue(v[1] ?? "");
    })
  );

  return (
    <div className={style.EditorContainer}>
      <h3>{props.title}</h3>
      {props.title === "初始代码" && (
        <p style={{ "font-size": "12px" }}>修改代码可以实时查看结果:</p>
      )}
      {props.error && <p style={{ "font-size": "12px", color: 'red' }}>{props.error}</p>}
      <div className={style.Editor} ref={monacoEl}></div>
    </div>
  );
};

export default Editor;
