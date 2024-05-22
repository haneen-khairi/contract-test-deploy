interface LinkResponse {
    data: {
        url: string,
        key: string
    }
}

export async function getImportLink(accessToken: string, file: File | null): Promise<any> {
    try {
        if (!file) {
            throw new Error("No file provided.");
        }

        const res1 = await fetch(
            `https://staging.backend.accordcontract.com/contract/upload/generate_s3_path`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: file.name,
                })
            }
        );

        if (!res1.ok) {
            throw new Error(`Failed to generate S3 path: ${res1.status}`);
        }

        const importLinkRes: LinkResponse = await res1.json();
        const uploadUrl = importLinkRes.data.url;

        const res2 = await fetch(
            uploadUrl,
            {
                method: "PUT",
                headers: {
                    "Content-Type": file.type
                },
                body: file,
                redirect: "follow"
            }
        );


        if (!res2.ok) {
            throw new Error(`Failed to upload file: ${res2.status} - ${JSON.stringify(res2)}`);
        }

        const confirm = await fetch(
            `https://staging.backend.accordcontract.com/contract/upload/confirmation`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key: importLinkRes.data.key,
                })
            }
        );

        if (!confirm.ok) {
            throw new Error(`Failed to confirm upload: ${confirm.status}`);
        }

        return {
            status: 201,
            ok: true,
            Message: "File Imported successfully and waiting to be processed"
        }
    } catch (error) {
        console.error("Error in getImportLink:", error);
        return {
            status: 500,
            ok: false,
            Message: `An error have occured: ${error}`
        }
        // throw new Error("An error occurred during file upload.");
    }
};
