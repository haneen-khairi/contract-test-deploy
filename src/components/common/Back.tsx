"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

// Define your BackButton component
const BackButton = () => {
    // Get the router object using the useRouter hook
    const router = useRouter();

    // Define a function to handle the back button click event
    const handleBackClick = () => {
        // Use the router object to navigate back to the previous page
        router.back();
    };

    // Render the back button component
    return (
        <IconButton
            style={{ border: "unset" }}
            variant="outline"
            // colorScheme='teal'
            onClick={handleBackClick}
            aria-label="back"
            icon={<ArrowBackIcon />}
            width={{ lg: "32px", md: "32px", sm: "16px" }}
        />
    );
};

// Export the BackButton component
export default BackButton;
