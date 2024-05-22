import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { SearchForm } from "@/components/search-form-users";
import { Paginator } from "@/components/paginator";
import { authOptions } from "@/types/nextauth.config";
import { Redirect } from "@/components/redirect";
import Link from "next/link";
import { getUsers } from "@/actions/users";
import UsersTable from "./UsersTable";

export default async function Permissions({ searchParams }: any) {
  const session = await getServerSession(authOptions);

  const users = await getUsers(searchParams, session?.tokens?.access || "");

  if (users.error === "Unauthorized") {
    return <Redirect />;
  }

  return (
    <>
      <SearchForm />
      <UsersTable users={users.results} />
      <Paginator totalCount={users.count} pageSize={10} />
    </>
  );
}
