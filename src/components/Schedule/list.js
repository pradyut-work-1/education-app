import React, { useState, useEffect } from "react";
import { Card, Grid, Loading, Text } from "@nextui-org/react";
import useSWR from "swr";
import { useRouter } from "next/router";

function ListCard({ title, desc }) {
  return (
    <Grid xs direction="column" justify="center" style={{ paddingInline: 0 }}>
      <Card
        isPressable
        css={{ p: "$6", p: 0, width: "max-content", alignSelf: "center" }}
      >
        <Card.Header>
          <img
            alt="nextui logo"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width="34px"
            height="34px"
            style={{ marginBottom: "auto" }}
          />
          <Grid.Container css={{ pl: "$6" }}>
            <Grid xs={12}>
              <Text h5 css={{ lineHeight: "$xs", m: 0 }}>
                {title}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text h6 css={{ color: "$accents8", m: 0 }}>
                {desc}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
      </Card>
    </Grid>
  );
}

export default function ScheduleList({}) {
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "api/fetchSchedule?date=" + router.query.date,
    fetcher
  );

  if (error) return <div>{JSON.stringify(error)}</div>;

  if (!data)
    return (
      <div>
        <Grid.Container
          gap={1.5}
          justify="center"
          css={{
            paddingInline: 0,
            alignSelf: "start",
            "@sm": { pt: 75 },
          }}
        >
          <Grid
            xs
            direction="column"
            justify="center"
            style={{ paddingInline: 0 }}
          >
            <Loading type="points" size="lg" />
          </Grid>
        </Grid.Container>
      </div>
    );

  if (!data.data[0])
    return (
      <div>
        <Grid.Container
          gap={1.5}
          justify="center"
          css={{
            paddingInline: 0,
            alignSelf: "start",
            "@sm": { pt: 75 },
          }}
        >
          <Grid
            xs
            direction="column"
            justify="center"
            style={{ paddingInline: 0 }}
          >
            <Text h4 weight="bold">
              No lectures Scheduled {" :("}
            </Text>
          </Grid>
        </Grid.Container>
      </div>
    );

  return (
    <div>
      <Grid.Container
        gap={1.5}
        justify="center"
        css={{
          paddingInline: 0,
          alignSelf: "start",
          "@sm": { pt: 75 },
        }}
      >
        {data.data.map((data, index) => (
          <div key={index}>
            {console.log(data)}
            {data.length
              ? null
              : data.info.map((data, index) => (
                  <ListCard
                    key={index}
                    title={data.subject}
                    desc={data.start + " - " + data.end + " | " + ( data.test ? " Test" : " Lecture")}
                  />
                ))}
          </div>
        ))}
      </Grid.Container>
    </div>
  );
}
