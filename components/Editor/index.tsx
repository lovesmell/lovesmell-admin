import { FC, useCallback, useMemo, useRef } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
      let data = null;
      const formData = new FormData();

      const quillObj = editorRef?.current?.getEditor();
      const range = quillObj?.getSelection();

      if (file) {
        formData.append("file", file);
        formData.append("resource_type", "raw");

        const responseUpload = await fetch(
          `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD}/upload`,
          { method: "POST", body: formData }
        );

        data = await responseUpload.json();
        if (data.error) {
          console.error(data.error);
        }

        quillObj.editor.insertEmbed(range.index, "image", data?.secure_url);
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [
            { header: "1" },
            { header: "2" },
            { header: [3, 4, 5, 6] },
            { font: [] },
          ],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
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
    }),
    [imageHandler]
  );

  const formats = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <ReactQuill
      {...field}
      ref={editorRef}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
};

export default Editor;
