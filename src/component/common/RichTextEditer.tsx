import ReactQuill from "react-quill";
interface IRichTextEditerProps {
  field: any;
}
export default function RichTextEditer(props: IRichTextEditerProps) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={props.field.value}
        onChange={(content: any) => props.field.onChange(content)}
        style={{ height: "400px" }}
      />
    </div>
  );
}
