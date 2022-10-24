import React from 'react'
import { Grid, Loading, Spacer } from '@nextui-org/react';
import useSWR from 'swr';
import ViewAssignmentList from '../../../components/Assignments/View/list';
import ViewAssignmentView from '../../../components/Assignments/View/info';
import ViewAssignmentSubmission from '../../../components/Assignments/View/Submission';

export default function ViewAssignmentsContainer({ }) {
return(
    <>
    <ViewAssignmentView/>
    <Spacer y={0.5} /> 
    <ViewAssignmentSubmission/>
    </>
)
}