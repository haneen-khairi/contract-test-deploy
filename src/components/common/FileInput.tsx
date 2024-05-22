import { useState, useRef } from "react";
import { Image, Text, Icon, Button, Flex } from "@chakra-ui/react";
import { BsFilePdf, BsFileWord, BsXCircle } from "react-icons/bs";


interface FileInputProps {
    selectedFile: File | null;
    setSelectedFile: (x: File | null)=> void,
    isTicket?: boolean
}

function FileInput ({selectedFile, setSelectedFile , isTicket = false}: FileInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMessage("Drop Here!");
  };

  const handleDragLeave = () => {
    setMessage("");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (!file) return;

    const fileType = file.type;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (allowedTypes.includes(fileType)) {
      //   setMessage(`File ${file.name} selected!`);
      setSelectedFile(file);
    } else {
      setMessage("Please select a PDF, DOC or DOCX file.");
      setSelectedFile(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setMessage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getIcon = (fileType: string): React.FC => {
    switch (fileType) {
      case "application/pdf":
        return BsFilePdf;
      case "application/msword":
        return BsFileWord;
      default:
        return BsFilePdf;
    }
  };

  return (
    <>
      <Flex
        border="2px dashed #1F4690"
        borderRadius="9px"
        p={4}
        textAlign="center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        bg={"#f7f7fa"}
        py={{ lg: "37px", base: "25px" }}
        w={"100%"}
        justify={"center"}
        align={"center"}
        direction={"column"}
        cursor={"pointer"}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          ref={inputRef}
        />
        {!isTicket && <Image
          width={{ lg: "120px", md: "110px", sm: "100px" }}
          src={"/images/upload.svg"}
          alt={"Upload"}
          mb={"20px"}
          pointerEvents={"none"}
        /> }
         {isTicket && <Flex justify={'flex-start'} gap={'8px'} mb={'16px'} width={'100%'}><Image
          width={{ lg: "16px", md: "16px", sm: "16px" }}
          src={"/images/paperclip.svg"}
          alt={"Upload"}
          pointerEvents={"none"}
        />
        <p>Attachment</p>
        </Flex> }
        <>
          <Text textAlign={isTicket ? 'start' : 'center'} width={'100%'} fontSize={"14px"} mb={'16px'} fontWeight={"400"} pointerEvents={"none"}>
            Drop your image here, or
            <Text as={"span"} color={"#287AE0"}>
              {" "}
              browse
            </Text>
          </Text>
          <Text
            fontSize={"12px"}
            color={"#969DB2"}
            textAlign={isTicket ? 'start' : 'center'}
            fontWeight={"400"}
            pointerEvents={"none"}
            mb={'16px'}
            width={'100%'}
          >
            Supports: PDF, DOC And DOCX
          </Text>
        </>
        <Text pointerEvents={"none"}>{message}</Text>
      </Flex>
      {selectedFile && (
        <Flex mt={2} alignItems="center">
          <Icon as={getIcon(selectedFile.type)} fontSize="2xl" />
          <Text
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            maxW={"calc(100% - 90px)"}
            flex={1}
            ml={2}
          >
            {selectedFile.name}
          </Text>
          <Button ml={2} variant="ghost" colorScheme="red" onClick={removeFile}>
            <Icon as={BsXCircle} />
          </Button>
        </Flex>
      )}
    </>
  );
};

export default FileInput;
