"use client"
import React, { useEffect,useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"; // Import Chakra UI components

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value?: string;
}

export default function CKeditor({
  onChange,
  editorLoaded,
  name,
  value,
}: CKeditorProps) {
  const editorRef = useRef<any>(null); // Ref to access the editor instance
  // useEffect(() => {
  //   editorRef.current = {
  //     CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
  //     ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
  //   };
  // }, []);
  const [selectedText, setSelectedText] = useState<string | null>('');
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // const handleEditorReady = (editor: ClassicEditor) => {
  //   editor.model.document.on("change:data", () => {
  //     const selection = editor.model.document.selection;

  //     if (selection.isCollapsed) {
  //       setSelectedText(""); // Clear selection if nothing is selected
  //     } else {
  //       const selectedRange = selection.getFirstRange();
  //       const text = selectedRange?.start.path[0];
  //       const extractedText = text?.data.substring(selectedRange?.start.offset, selectedRange?.end.offset);
  //       setSelectedText(extractedText);

  //       // Get menu position based on selection
  //       const domRange = editor.editing.view.domConverter.viewRangeToDom(selectedRange);
  //       const rect = domRange.getClientRects()[0]; // Position of the selection
  //       setMenuPosition({ x: rect.left, y: rect.bottom });
  //     }
  //   });
  // };
  // useEffect(() => {
  //   if (editorRef.current && editorRef.current.editor) {
  //     const editorInstance = editorRef.current.editor; 
  //     console.log("==== editor ===", editorInstance)
  //     editorInstance.model.document.on('selectionchange', () => {
  //       const selection = editorInstance.model.document.selection;
  //       if (selection.isCollapsed) {
  //         console.log('No text selected');
  //       } else {
  //         const selectedRange = selection.getFirstRange();
  //         const selectedText = selectedRange.start.path[0].data.substring(selectedRange.start.offset, selectedRange.end.offset);
  //         console.log('Selected text:', selectedText);
  //       }
  //     });
  //   }
  // }, [editorRef.current]); 
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          id={name}
          editor={ClassicEditor}
          data={value}
          
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
            // console.log("event", event)
            // handleEditorReady(event)
          }}
          
          // onReady={handleEditorReady} // Call onReady when the editor is loaded

          config={{
            toolbar: {
                items: [
                    'undo', 'redo', 
                    'heading',
                    'alignment','bold', 'underline', 'italic', 'strikethrough', 'code','subscript', 'superscript', 'removeFormat',
                    'bulletedList', 'numberedList',                    
                    'link', 'uploadImage', 'blockQuote',  'mediaEmbed', 'codeBlock', 'htmlEmbed','horizontalLine', 
                ],
                
            }
          }}
          // {selectedText && (
          //   <Menu isOpen={!!selectedText} closeOnSelect> 
          //     <MenuButton
          //       as={Button}
          //       position="absolute"
          //       left={`${menuPosition.x}px`}
          //       top={`${menuPosition.y}px`}
          //       size="sm"
          //       variant="outline"
          //     >
          //       Options
          //     </MenuButton>
          //     <MenuList>
          //       {/* Add your menu items here */}
          //       <MenuItem onClick={() => console.log("Bold:", selectedText)}>Bold</MenuItem>
          //       <MenuItem onClick={() => console.log("Italic:", selectedText)}>Italic</MenuItem>
          //       {/* ... more menu items */}
          //     </MenuList>
          //   </Menu>
          // )} 
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}