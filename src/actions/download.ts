export async function downloadFile(
    fileURL: string,
    fileName: string
): Promise<void> {
    try {
        // Logic for downloading the file (e.g., using fetch)
        // For example:
        const res = await fetch(fileURL);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error downloading file:", error);
        // Handle errors as needed
    }
}
