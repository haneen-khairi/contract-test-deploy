"use client"
import { getContractByID } from "@/actions/contracts";
import CKeditor from "@/components/CKeditor";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Divider, Flex } from "@chakra-ui/react";
import ClausesItem from "@/components/clauses/ClausesItem";
import { CustomAxios } from "@/utils/CustomAxios";
type ContractDocument = {
  id: string;
  file: string;
  name: string;
  status: string;
  summary: string;
  html_content?: string | null;
};
export default function Page() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const query = useSearchParams()
  const { data: session } = useSession();
  const [clauses, setClauses] = useState([])
  const [document, setDocuments] = useState<ContractDocument>({
    id: "",
    file: "",
    name: "",
    status: "",
    summary: "",
    html_content: ""
});
  const id = query.get("id") as any;
  async function getClauses(){
    const response = await CustomAxios(`get`, `${process.env.NEXT_PUBLIC_API_KEY}contract/edit/clauses`, {
      'Authorization': `Bearer ${session?.tokens?.access}`
    })
    setClauses(response.data)
    console.log("reposne", response)
  }
  useEffect(() => {
    setEditorLoaded(true);
    const fetchFile = async () => {
      console.log(query.get("id"),
        session?.tokens?.access || "", "test id and session")
      try {
              const fileData = await getContractByID(
                id,
                session?.tokens?.access || ""
              );
              console.log("doc ion editor", fileData);
              setDocuments(fileData);
          } catch (error) {
              console.error("Error fetching file data:", error);
          }
      };
      if(session?.tokens?.access){
        getClauses()
      }
      fetchFile();
  }, [id, session?.tokens?.access]);
  return (
    <div className="ckeditor-container">
      <CKeditor
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        value={document.html_content || ""}
        editorLoaded={editorLoaded}
      />
      <div className="clauses">
        <h3 className="clauses__header">Clauses List</h3>
        <Divider color={'#000000'} mb={'16px'} />
        <Flex direction="column" gap="16px">
        {clauses?.length > 0 && clauses.map((clause: any) => <ClausesItem
        key={clause.id}
        content={clause.content}
         id={clause.id} 
         onHandleClick={() => setDocuments((prevData) => ({
          ...prevData, 
          html_content: prevData.html_content + clause.content
        }))} />
         )}
        </Flex>
      </div>
    </div>
  );
}