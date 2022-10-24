import useSWR from "swr";
import { Loading, Grid } from "@nextui-org/react";


export default function ViewAssignmentList() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error } = useSWR(
      "../api/fetchAssignment?id=1",
      fetcher
    );
  
    if (error) return <div>{JSON.stringify(error)}</div>;
  
    if (!data)
      return (
        <div>
          <Grid.Container gap={1.5} justify="flex-start">
            <Grid xs={12} justify="center">
              <Loading type="points" size="lg" />
            </Grid>
          </Grid.Container>
        </div>
      );
    
  return (
    <>
       {JSON.stringify(data)}  data
    </>
  )
}