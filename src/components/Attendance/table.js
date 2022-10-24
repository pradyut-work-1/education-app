import { Table, Text, Loading, Grid } from "@nextui-org/react"
import { useState } from "react";
import useSWR from "swr";

export default function AttendanceTable(params) {
  const now = new Date();
  const daysInMonth = getAllDaysInMonth(now.getFullYear(), now.getMonth());

  const columns = [
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "in",
      label: "IN",
    },
    {
      key: "out",
      label: "OUT",
    },
  ];

  function getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);
  const [dataGot, setDataGot] = useState();
    const dates = [];
  let index = 0
    while (date.getMonth() === month) {  
      const fetcher = (...args) => fetch(...args).then((res) => res.json());
      const { data, error } = useSWR(
        "api/fetchAttendance?on=" + new Date(date).toISOString().substring(0,10).toString(),
        fetcher
      );
      if(error){console.log(error)};
      if(data){
        dates.push({ key: index, date : new Date(date).toISOString().substring(0,10).toString(), status: (data.data.in === null) && (data.data.out === null) ? 'Absent' : 'Present' , in: data.data.in, out: data.data.out });
      }
      else{
        dates.push({ key: index, date : new Date(date).toISOString().substring(0,10).toString(), status: 'Unavailable', in: null, out: null });
      }
      date.setDate(date.getDate() + 1);
      index = index + 1;
    }
  
    return dates;
  }
  


    return(
        <>
        <Text>{console.log(daysInMonth)}</Text>
        <Text h4>Prev Month</Text>
            <Table
      aria-label="Example table with static content"
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
      <Table.Body items={daysInMonth}>
        {(item) => (
          <Table.Row key={item.key}>
            {(columnKey) => <Table.Cell>{item[columnKey] === null ? '-' : item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
        </>
    )
}