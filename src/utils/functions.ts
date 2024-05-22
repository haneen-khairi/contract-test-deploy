import { signOut } from "next-auth/react";
import { UseToastOptions } from "@chakra-ui/react";

interface ApiResponse {
  error: string;
}

export const handleEditPermissionResponse = (
  res: ApiResponse,
  clear: () => void,
  toast: (options?: UseToastOptions | undefined) => void
) => {
  if (res.error === "Unauthorized") {
    toast({
      description: "Login token expired please login again",
      position: "top",
      status: "error",
      duration: 3000,
      isClosable: false,
    });
    signOut();
  } else if (res.error !== "") {
    toast({
      description: `Request failed, ${res.error}`,
      position: "top",
      status: "error",
      duration: 3000,
      isClosable: false,
    });
  } else {
    toast({
      description: "Request sent successfully",
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
    clear();
  }
};

export function isoToTimeAMPM(isoString: string) {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Extract hours (0-23) and minutes (0-59)
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Use modulo (%) to get hour in 12-hour format (1-12)
  const hour12 = hours % 12 || 12;

  // Use conditional statement for AM/PM
  const amPm = hours < 12 ? "AM" : "PM";

  // Return formatted time string
  return `${hour12}:${minutes} ${amPm}`;
}
export function dateConverter(timestamp:string){
  const formattedDate = new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  return formattedDate
}