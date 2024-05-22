import { getServerSession } from "next-auth/next";
import PermissionsTable from "./PermissionsTable";
import { SearchForm } from "@/components/search-form-permissions";
import { Paginator } from "@/components/paginator";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import { getPermissions } from "@/actions/permissions";

export default async function Permissions({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const permissions = await getPermissions(
    searchParams,
    session?.tokens?.access || ""
  );

  if (permissions.error === "Unauthorized") {
    return <Redirect />;
  }

  return (
    <>
      <SearchForm />
      <PermissionsTable permissions={permissions.results} />
      <Paginator totalCount={permissions.count} pageSize={10} />
    </>
  );
}
