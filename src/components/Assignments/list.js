import React, { useState, useEffect } from "react";
import { Card, Grid, Loading, Text, Row,  } from "@nextui-org/react";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

function ListCard({ title, desc, expiry, by, subject, expired, id }) {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "api/fetchAssignmentStatus?id=" + id + "&by=" + '123',
    fetcher
  );
  if (error) return <div>{JSON.stringify(error)}</div>;
  
  if (!data)
  return (
    <div>
        <Grid xs={12} sm={4}>
      <Card isPressable>
        <Card.Header>
          <img
            alt="nextui logo"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width="34px"
            height="34px"
            />
          <Grid.Container css={{ pl: "$6" }}>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: "$xs", m: 0 }}>
                {title}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text size="$xs" css={{ color: "$accents8" }}>
                {expiry}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: 0 }}>
          <Text css={{ color: "$accents8" }}> {desc}</Text>
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>
              {subject == 1 ? "English" : null}
              {subject == 2 ? "Hindi" : null}
              {subject == 3 ? "Marathi" : null}
              {subject == 4 ? "Science I" : null}
              {subject == 5 ? "Science II" : null}
              {subject == 6 ? "Maths I" : null}
              {subject == 7 ? "Maths II" : null}
              {by}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
      </Grid>
      </div>
    );
    
    const submitted = data.data != null ? true : false;
    
    const show = (router.query.status == 'all' ? true : false ) || (router.query.status == 'expired' && expired && !submitted ? true : false || router.query.status == 'submitted' && submitted ? true : false ) || (router.query.status == 'pending' && !submitted && !expired ? true : false )

  return (
    <>
    {show ? <Grid xs={12} sm={4}>
      <Link href={"Assignments/View?id=" + id}>
      <Card isPressable>
        <Card.Header>
          <img
            alt="nextui logo"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width="34px"
            height="34px"
          />
          <Grid.Container css={{ pl: "$6" }}>
            <Grid xs={12}>
              <Text h4 css={{ lineHeight: "$xs", m: 0 }}>
                {title}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text size="$xs" css={{ color: "$accents8" }}>
                {expiry}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: 0 }}>
          <Text css={{ color: "$accents8" }}> {desc}</Text>
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>
              {subject == 1 ? "English" : null}
              {subject == 2 ? "Hindi" : null}
              {subject == 3 ? "Marathi" : null}
              {subject == 4 ? "Science I" : null}
              {subject == 5 ? "Science II" : null}
              {subject == 6 ? "Maths I" : null}
              {subject == 7 ? "Maths II" : null}
              {by}
            </Text>
            <Text
              color={
                submitted
                  ? "success"
                  : false || expired
                  ? "error"
                  : false || "warning"
              }
              css={{
                fontWeight: "$semibold",
                fontSize: "$sm",
              }}
              b
            >
              {submitted
                ? "Submitted"
                : false || expired
                ? "Expired"
                : false || "Pending"}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
      </Link>
    </Grid> : null }

    </>
  );
}

export default function AssignmentsList({}) {
  const router = useRouter();
  const filters = router.query.status;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "api/fetchAssignments?subject=" + router.query.subject,
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
    <div>
      {console.log(data.data)}
      <Grid.Container gap={1.5} justify="flex-start">
        {data.data.map((data, index) => {
          const currentDate = new Date();
          const selectedDate = new Date(data.expiry);
          const checkExpiry = currentDate >= selectedDate;
          selectedDate.setDate(selectedDate.getDate() + 1);
          return (
            <>
                <ListCard
                  key={index}
                  id={data.id}
                  title={data.title}
                  desc={data.description}
                  expiry={data.expiry}
                  subject={data.subject}
                  by = {data.by.Name}
                  expired={checkExpiry ? true : false}
                />
            </>
          );
        })}
      </Grid.Container>
    </div>
  );
}
