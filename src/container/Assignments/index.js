import React from 'react'
import AssignmentFilters from '../../components/Assignments/filters'
import AssignmentsList from '../../components/Assignments/list'

export default function AssignmentsContainer({ }) {

  return (
    <>
    <AssignmentFilters />
    <AssignmentsList />
      {/* <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <ScheduleCalender />
        </Grid>
        <Grid xs={12} sm={6} justify="center">
          <ScheduleList />
        </Grid>
      </Grid.Container> */}
    </>
  )
}