import { Popover, Checkbox, Grid, Button, Text, Radio } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function DoubtsFilters(params) {
  const router = useRouter();
  useEffect(() => {
    router.push({
      query: {
        subject: ["1", "2", "3", "4", "5", "6", "7"],
        status: 'all'
      },
    });
  }, []);

  return (
    <div>
      <Grid.Container gap={1} justify="flex-end">
        <Grid justify={"end"}>
          <FilterStatus />
        </Grid>
        <Grid justify={"end"}>
          <FilterSubjects />
        </Grid>
        <Grid justify={"end"}>
         <Button auto>
          <Link href='./Doubts/New'>
            <Text b css={{color: 'white'}}>+ New</Text>
          </Link>
         </Button>
        </Grid>
      </Grid.Container>
    </div>
  );
}

function FilterStatus() {
  const router = useRouter();

  const [selected, setSelected] = React.useState("all");

  const selectChanged = (e) => {
    setSelected(e);
    router.push({
      query: {
        subject: router.query.subject,
        status: e,
      },
    });
  };

  return (
    <Popover>
      <Popover.Trigger>
        <Button auto shadows color="">
          Filters
        </Button>
      </Popover.Trigger>
      <Popover.Content css={{ p: 12 }}>
        <Radio.Group
          label="Select filter(s)"
          orientation="vertical"
          color="secondary"
          value={selected}
          onChange={selectChanged}
        >
        <Radio size="sm" color="primary" value="all">
          All
        </Radio>
          <Radio size="sm" color="success" value="Solved">
            Solved
          </Radio>
          <Radio size="sm" color="warning" value="pending">
            Pending
          </Radio>
        </Radio.Group>
      </Popover.Content>
    </Popover>
  );
}

function FilterSubjects(params) {
  const router = useRouter();

  const [selected, setSelected] = React.useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);

  const selectChanged = (e) => {
    setSelected(e);
    router.push({
      query: {
        status: router.query.status,
        subject: e,
      },
    });
  };

  return (
    <Popover>
      <Popover.Trigger>
        <Button auto shadows color="">
          Subjects
        </Button>
      </Popover.Trigger>
      <Popover.Content css={{ p: 12 }}>
        <Checkbox.Group
          label="Select Subject(s)"
          orientation="vertical"
          color="secondary"
          value={selected}
          onChange={selectChanged}
        >
          <Checkbox size="sm" color="gradient" value="1">
            English
          </Checkbox>
          <Checkbox size="sm" color="gradient" value="2">
            Hindi
          </Checkbox>
          <Checkbox size="sm" color="gradient" value="3">
            Marathi
          </Checkbox>
          <Checkbox size="sm" color="gradient" value="4">
            Science I
          </Checkbox>
          <Checkbox size="sm" color="gradient" value="5">
            Science II
          </Checkbox>
          <Checkbox size="sm" color="gradient" value="6">
            Maths I
          </Checkbox>
          <Checkbox size="sm" color="gradient" value="7">
            Maths II
          </Checkbox>
        </Checkbox.Group>
      </Popover.Content>
    </Popover>
  );
}
