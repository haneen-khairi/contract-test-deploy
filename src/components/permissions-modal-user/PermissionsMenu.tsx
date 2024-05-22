import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  useToast,
} from "@chakra-ui/react";
import { UserPermission } from "@/types/types";
import { useRecoilState } from "recoil";
import { rolesState } from "@/recoil/atoms";
import { IoChevronDownSharp } from "react-icons/io5";
import { editPermission } from "@/actions/permissions";
import { useSession } from "next-auth/react";
import { handleEditPermissionResponse } from "@/utils/functions";

interface UserPermissionsProps {
  permissions: UserPermission[];
  userId: string;
  contractId: string;
}

const UserPermissions: React.FC<UserPermissionsProps> = ({
  permissions,
  userId,
  contractId,
}) => {
  const [roles] = useRecoilState(rolesState);
  const [newPermission, setNewPermission] = useState(permissions);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const toast = useToast();

  const handlePermissionChange = async (value: string | string[]) => {
    setLoading(true);
    const selectedRoles = Array.isArray(value) ? value : [value];
    const updatedPermissions: UserPermission[] = selectedRoles.map((roleId) => {
      const role = roles.find((role) => `${role.id}` === roleId);
      return {
        id: parseInt(roleId, 10),
        name: role?.name || "",
      };
    });

    const newlyAddedPermissions = updatedPermissions.filter(
      (permission) => !newPermission.some((p) => p.id === permission.id)
    );

    const removedPermissions = newPermission.filter(
      (p) => !updatedPermissions.some((permission) => permission.id === p.id)
    );

    if (newlyAddedPermissions.length > 0) {
      const res = await editPermission(
        contractId,
        userId,
        newlyAddedPermissions[0].id,
        "POST",
        session?.tokens?.access || ""
      );
      handleEditPermissionResponse(res, () => {}, toast);
    }
    if (removedPermissions.length > 0) {
      const res = await editPermission(
        contractId,
        userId,
        removedPermissions[0].id,
        "DELETE",
        session?.tokens?.access || ""
      );
      handleEditPermissionResponse(res, () => {}, toast);
    }

    setLoading(false);

    setNewPermission(updatedPermissions);
  };

  return (
    <Menu closeOnSelect={false} placement="bottom-end">
      <MenuButton
        as={Button}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        rightIcon={<IoChevronDownSharp />}
        maxW={"100%"}
      >
        <Text
          w={"100px"}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {newPermission.map((permission, index) => (
            <Fragment key={permission.id}>
              {index > 0 && ", "}
              {permission.name}
            </Fragment>
          ))}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          value={newPermission.map((e) => e.id.toString())}
          onChange={handlePermissionChange}
          title="Roles"
          type="checkbox"
        >
          {roles.map((role) => (
            <MenuItemOption
              isDisabled={loading}
              key={role.id}
              value={role.id.toString()}
            >
              {role.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default UserPermissions;
