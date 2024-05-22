"use client";

import { Skeleton, Table, Tbody, Td, Tr } from "@chakra-ui/react";
export default function TableLoading(props: {
  tr: number;
  td: number;
  con: boolean;
}) {
  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < props.tr; i++) {
      const cells = [];
      for (let j = 0; j < props.td; j++) {
        cells.push(
          <Td key={j}>
            <Skeleton />
          </Td>
        );
      }
      rows.push(
        <Tr key={i} className={"tableRow"}>
          {cells}
        </Tr>
      );
    }
    return rows;
  };
  if (!props.con) {
    return (
      <Table>
        <Tbody>{renderRows()}</Tbody>
      </Table>
    );
  } else {
    return <>{renderRows()}</>;
  }
}
