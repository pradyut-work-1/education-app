import {
  Container,
  Grid,
  Text,
  Collapse,
  Row,
  Card,
  Checkbox,
  Popover,
  Button,
  Pagination,
  Spacer,
  Table,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function FilesList(params) {
  const [selected, setSelected] = React.useState(0);

  const router = useRouter();

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replace("_", " "),
    [selected]
  );

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "type",
      label: "TYPE",
    },
    {
      key: "by",
      label: "BY",
    },
    {
      key: "date",
      label: "DATE",
    },
  ];

  const FileRows = [];

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("api/fetchFiles", fetcher);
  if (error) return <div>{JSON.stringify(error)}</div>;

  if (data) {
    data.data.map((item, index) => {
      FileRows.push({
        key: index,
        by: item.teacher_id.name,
        type: item.type,
        name: item.name,
        date: item.on,
        url: item.url,
      });
    });
  }

  const rowsPerPage = 6;
  const pagination = Math.ceil(FileRows.length / rowsPerPage);
  selectedValue ? router.push(FileRows[selectedValue].url) : null;
  return (
    <>
      <Table
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        color="secondary"
        aria-label="Example pagination  table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={FileRows}>
          {(item) => (
            <Table.Row key={item.key}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          align="center"
          rowsPerPage={rowsPerPage}
          total={pagination}
        />
      </Table>
    </>
  );
}
