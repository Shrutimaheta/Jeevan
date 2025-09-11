import React, { useCallback, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  minHeight?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange: externalOnChange,
  placeholder = "Enter text...",
  ariaLabel = "Text editor",
  className = "",
  minHeight = "120px",
}) => {
  const [internalValue, setInternalValue] = useState<string>(value || "");

  const handleChange = useCallback(
    (content: string) => {
      setInternalValue(content);
      externalOnChange?.(content);
    },
    [externalOnChange]
  );

  const currentValue = value ?? internalValue;

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }],
      ["link"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "link",
  ];

  return (
    <div
      role="textbox"
      aria-label={ariaLabel}
      className={`quill-style-editor ${className}`}
      style={{ minHeight }}
    >
      <ReactQuill
        theme="snow"
        className="snow-editor" // ✅ added alongside ql-container
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

const MemoTextEditor = React.memo(TextEditor);
MemoTextEditor.displayName = "TextEditor";

export default MemoTextEditor;
