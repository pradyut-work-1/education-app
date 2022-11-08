import {
  Container,
  Grid,
  Text,
  Collapse,
  Row,
  Card,
  Checkbox,
  Popover,
  Button,
  Pagination,
  Spacer,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DoubtsCard({ index, id, doubt, by, subject }) {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "api/fetchDoubtStatus?id=" + id,
    fetcher
  );
  if (error) return <div>{JSON.stringify(error)}</div>;

    if(!data) return (<Grid xs={12} sm={6} key={index}>
      <Link href={"./Doubts/View?id=" + id}>
        <Card isPressable>
          <Card.Body css={{ py: 0, pt: 10 }}>
            <Text css={{ color: "$accents8" }}>
              {doubt} - <b> {by}</b>
            </Text>
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
              <Text b>
                {(subject == 1 ? "English" : null) ||
                  (subject == 2 ? "Hindi" : null) ||
                  (subject == 3 ? "Marathi" : null) ||
                  (subject == 4 ? "Science I" : null) ||
                  (subject == 5 ? "Science II" : null) ||
                  (subject == 6 ? "Maths I" : null) ||
                  (subject == 7 ? "Maths II" : null)}
              </Text>
            </Row>
          </Card.Footer>
        </Card>
      </Link>
    </Grid>
    );
  const solved = data.data === null ? false : true;

  const pending = data.data === null ? true : false;
  
  return (
    <Grid xs={12} sm={6} key={index}>
      <Link href={"./Doubts/View?id=" + id}>
        <Card isPressable>
          <Card.Body css={{ py: 0, pt: 10 }}>
            <Text css={{ color: "$accents8" }}>
             {doubt} - <b> {by}</b>
            </Text>
          </Card.Body>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
              <Text b>
                {(subject == 1 ? "English" : null) ||
                  (subject == 2 ? "Hindi" : null) ||
                  (subject == 3 ? "Marathi" : null) ||
                  (subject == 4 ? "Science I" : null) ||
                  (subject == 5 ? "Science II" : null) ||
                  (subject == 6 ? "Maths I" : null) ||
                  (subject == 7 ? "Maths II" : null)}
              </Text>
              <Text
                color={
                  solved
                    ? "success"
                    : false || pending
                    ? "warning"
                    : false
                }
                css={{
                  fontWeight: "$semibold",
                  fontSize: "$sm",
                }}
                b
              >
                {solved
                  ? "Solved"
                  : false || pending
                  ? "Pending"
                  : false}
              </Text>
            </Row>
          </Card.Footer>
        </Card>
      </Link>
    </Grid>
  );
}
