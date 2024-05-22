import { ReadonlyURLSearchParams } from "next/navigation";

interface DownloadError {
    message: string;
}

const pdfURL =
    "https://staging.backend.accordcontract.com/contract/core/download/pdf";
const csvURL =
    "https://staging.backend.accordcontract.com/contract/core/download/csv";


const downloadFile = async (url: string, token: string): Promise<Blob> => {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    return blob;
};

const handleDownload = async (token: string, format: 'pdf' | 'csv', searchParams: ReadonlyURLSearchParams, toast: any) => { // Pass toast function
    try {
        const typeUrl = format === 'pdf' ? pdfURL : csvURL;
        const url = `${typeUrl}?${searchParams.toString()}`
        const fileBlob = await downloadFile(url, token);

        const filename = format === 'pdf' ? 'Contracts-Data.pdf' : 'Contracts-Data.csv';
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(fileBlob);
        link.setAttribute('download', filename);
        link.click();

        window.URL.revokeObjectURL(link.href);
    } catch (error: unknown) { // Handle unknown errors
        console.error('Error downloading file:', error);
        toast({ // Call toast function passed as argument
            title: 'Download Error',
            description: (error as DownloadError).message || 'An error occurred while downloading the file.',
            status: 'error',
            isClosable: true,
        });
    }
};

export { downloadFile, handleDownload };
