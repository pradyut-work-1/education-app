import React from 'react'
import ScheduleCalender from '../../components/Schedule/calender'
import ScheduleList from '../../components/Schedule/list'
import { Grid } from '@nextui-org/react'

export default function ScheduleContainer({ }) {

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <ScheduleCalender />
        </Grid>
        <Grid xs={12} sm={6} justify="center">
          <ScheduleList />
        </Grid>
      </Grid.Container>
    </>
  )
}