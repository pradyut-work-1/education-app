import DoubtsFilters from "../../components/Doubts/filters";
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
} from "@nextui-org/react";
import DoubtsCard from "../../components/Doubts/Card";
import useSWR from "swr";

export default function DoubtsContainer(params) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("api/fetchDoubts", fetcher);
  
  if (error) return <div>{JSON.stringify(error)}</div>;

  if (!data) return <div>Loading</div>;

console.log(data)
  return (
    <>
      <DoubtsFilters />
      <Grid.Container gap={1.5} justify="flex-start">
        {data.data.map((item, index) => (
          <DoubtsCard
          key={index}
            by={item.by.Name}
            subject={item.subject}
            doubt={item.info}
            index={index}
            id={item.id}
          />
        ))}
      </Grid.Container>
    </>
  );
}
