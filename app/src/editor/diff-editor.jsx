import style from "./editor.module.css";
import { onMount, onCleanup, createSignal, createEffect, on } from "solid-js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const DiffEditor = (props) => {
  const [editor, setEditor] = createSignal(null);
  let monacoEl;

  onMount(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return;

        return monaco.editor.createDiffEditor(monacoEl);
      });
    }

    onCleanup(() => editor()?.dispose());
  });

  createEffect(
    on(props.files, (v) => {
      editor().setModel({
        original: monaco.editor.createModel(v[0] ?? "", "javascript"),
        modified: monaco.editor.createModel(v[1] ?? "", "javascript"),
      });
    })
  );

  return (
    <div className={style.EditorContainer}>
      <h3>{props.title}</h3>
      <div
        className={style.Editor}
        ref={monacoEl}
        style={{ width: "80vw" }}
      ></div>
    </div>
  );
};

export default DiffEditor;
