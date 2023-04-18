import { FC, useCallback, useMemo, useRef } from "react";

import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "@lovesmell/config/firebase";

import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageResize", ImageResize);

interface IProps {
  field?: any;
}

const Editor: FC<IProps> = ({ field }) => {
  const editorRef = useRef<any>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;

      const quillObj = editorRef?.current?.getEditor();
      const range = quillObj?.getSelection();

      if (!file) {
        return;
      }

      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            quillObj.editor.insertEmbed(range.index, "image", downloadURL);
          });
        }
      );
    };
  }, []);

  const modules = {
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    toolbar: {
      container: [
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <ReactQuill
      {...field}
      ref={editorRef}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="Type something here..."
    />
  );
};

export default Editor;
