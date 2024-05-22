import { RegisterView } from "@/views/invite-register";

export default function Page({ params }: { params: { token: string } }) {    
    return <RegisterView token={params.token} />;
}
