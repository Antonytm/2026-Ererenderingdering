"use client";

import { useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import dynamic from "next/dynamic";
import type { OnMount } from "@monaco-editor/react";
import { registerCompletions } from "@/src/lib/monaco-completions";

const Editor = dynamic(() => import("@monaco-editor/react").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground text-sm">
      Loading editor...
    </div>
  ),
});

export interface MonacoEditorHandle {
  getValue: () => string;
  setValue: (value: string) => void;
  insertSnippet: (snippet: string) => void;
}

interface MonacoEditorProps {
  defaultValue?: string;
  onRunShortcut?: () => void;
  onChange?: (value: string) => void;
}

export const MonacoEditor = forwardRef<MonacoEditorHandle, MonacoEditorProps>(
  function MonacoEditor({ defaultValue = "", onRunShortcut, onChange }, ref) {
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => editorRef.current?.getValue() ?? "",
      setValue: (value: string) => editorRef.current?.setValue(value),
      insertSnippet: (snippet: string) => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.focus();
        const controller = (editor as any).getContribution("snippetController2");
        if (controller) {
          controller.insert(snippet);
        } else {
          // Fallback: insert as plain text (strip snippet placeholders)
          const plain = snippet.replace(/\$\{\d+:?(.*?)\}/g, "$1").replace(/\$\d+/g, "");
          editor.trigger("helpPanel", "type", { text: plain });
        }
      },
    }));

    const handleMount: OnMount = useCallback(
      (editor, monaco) => {
        editorRef.current = editor;
        registerCompletions(monaco);

        // Notify parent of content changes
        editor.onDidChangeModelContent(() => {
          onChange?.(editor.getValue());
        });

        // Ctrl/Cmd+Enter to run
        editor.addAction({
          id: "run-script",
          label: "Run Script",
          keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
          run: () => onRunShortcut?.(),
        });
      },
      [onRunShortcut]
    );

    return (
      <Editor
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        theme="vs-dark"
        onMount={handleMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 8 },
        }}
      />
    );
  }
);
