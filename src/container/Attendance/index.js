import { Grid, Text } from "@nextui-org/react";
import AttendanceTable from "../../components/Attendance/table";

export default function AttendanceContainer(params) {
    return(
        <>
        <Grid.Container gap={2}>
            <Grid xs={12} direction="column">
      <Text h4>Prev Month</Text>
        <AttendanceTable month={-1} />
            </Grid>
            <Grid xs={12} direction="column">
      <Text h4>Current Month</Text>
        <AttendanceTable month={0} />
            </Grid>
        </Grid.Container>
        </>
    )
}