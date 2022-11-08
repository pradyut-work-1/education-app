import { Grid, Spacer, Card } from "@nextui-org/react";
import ReportsBarChart from "../../components/Reports/barChart";

export default function ReportsContainer(params) {
    return(
        <>
        <Grid.Container gap={2}>
            <Grid xs={12}>
                <Card>
                    <ReportsBarChart />
                    abc
                </Card>
            </Grid>
            <Grid xs={6}>
                <Card>
                    <Spacer y={10} />
                </Card>
            </Grid>
        </Grid.Container>
        </>
    )
}