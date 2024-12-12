import dynamic from "next/dynamic"
import { useState } from "react"

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false })
import "suneditor/dist/css/suneditor.min.css"

const Editor = () => {
  const [editorContent, setEditorContent] = useState("")

  const handleChange = (content: string) => {
    setEditorContent(content)
  }

  return (
    <SunEditor
      setOptions={{
        height: "300",
        buttonList: [
          ["bold", "underline", "italic"],
          ["link", "image"],
          ["align", "list"]
        ]
      }}
      onChange={handleChange}
      setContents={editorContent}
    />
  )
}

export default Editor
