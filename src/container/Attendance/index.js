import { Grid } from "@nextui-org/react";
import AttendanceTable from "../../components/Attendance/table";

export default function AttendanceContainer(params) {
    return(
        <>
        <Grid.Container gap={2}>
            <Grid xs={12} sm={6}>
        <AttendanceTable/>
            </Grid>
            {/* <Grid xs={12} sm={6}>
        <AttendanceTable/>
            </Grid> */}
        </Grid.Container>
        </>
    )
}