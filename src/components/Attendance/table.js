import { Table, Text, Loading, Grid } from "@nextui-org/react";
import { useState, useEffect } from "react";
import useSWR from "swr";

export default function AttendanceTable({month}) {
const [daysInMonthData, setDaysInMonth] = useState([])
  const columns = [
    {
      key: "date",
      label: "DATE",
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

      const fetcher = (...args) => fetch(...args).then((res) => res.json());
      const { data, error } = useSWR(
        "api/fetchAttendance",
        fetcher
      );
      if (error) {
        console.log(error);
      }
  
useEffect(() => {
    if(data){
    function GetAllDaysInMonth(year, month) {
      const date = new Date(year, month, 1);
      const dates = [];
      let index = 0;
      
      while (date.getMonth() === month) {
        const currentDate = new Date(date).toISOString().substring(0, 10).toString();
        dates.push({
          key: index,
          date: new Date(date).toISOString().substring(0, 10).toString(),
          in: data.data.map(d => d.on === currentDate ? d.in : null),
          out: data.data.map(d => d.on === currentDate ? d.out : null)
        });
        date.setDate(date.getDate() + 1);
        index = index + 1;
      }
  
      return dates;
    }
    const now = new Date();
    const daysInMonth = GetAllDaysInMonth(now.getFullYear(), now.getMonth() + month);
    setDaysInMonth(daysInMonth)
    console.log(daysInMonth)
  }
}, [data]);

  return (
    <>
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
        <Table.Body items={daysInMonthData}>
          {(item) => (
            <Table.Row key={item.key}>
              {(columnKey) => (
                <Table.Cell>
                  {item[columnKey]}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
}
