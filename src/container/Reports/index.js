import { Grid, Spacer, Card } from "@nextui-org/react";
import ReportsInfoBlock from "../../components/Reports/infoBlock";
import useSWR from "swr";

export default function ReportsContainer(params) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("api/fetchScores", fetcher);
  if (error) return <div>{JSON.stringify(error)}</div>;

  if (!data) return <div>Loading</div>;

  return (
    <>
      <Grid.Container gap={1}>
        {data.data.map((item, index) => (
          <Grid key={index} xs={12} sm={6} md={4}>
            <div style={{ width: "100%" }}>
              <ReportsInfoBlock subject={item.assessment_id.subject} date={item.assessment_id.date} obtained={item.marksO} total={item.assessment_id.marksT} />
            </div>
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
}
