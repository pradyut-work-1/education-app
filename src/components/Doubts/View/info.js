import useSWR from "swr";
import {
  Loading,
  Grid,
  Text,
  Card,
  Row,
  Button,
  Container,
  Divider,
} from "@nextui-org/react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useRouter } from "next/router";

export default function ViewDoubtsView() {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "../api/fetchDoubt?id=" + router.query.id,
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
    <>
        <Card css={{mt: 15}}>
        <Card.Header>
          
              <Text h3 css={{ lineHeight: "$xs", m: 0 }}>
              {(data.data.subject == 1 ? "English" : null) ||
              (data.data.subject == 2 ? "Hindi" : null) ||
              (data.data.subject == 3 ? "Marathi" : null) ||
              (data.data.subject == 4 ? "Science I" : null) ||
              (data.data.subject == 5 ? "Science II" : null) ||
              (data.data.subject == 6 ? "Maths I" : null) ||
              (data.data.subject == 7 ? "Maths II" : null)}
              </Text>

          {/* <Text
            color={
              item.expired
                ? "error"
                : false || item.submitted
                ? "success"
                : false || item.pending
                ? "warning"
                : false
            }
            css={{
              fontWeight: "$semibold",
              fontSize: "$md",
              'md': {
                fontSize: "$lg"
              }
            }}
            b
          >
            {item.expired
              ? "Expired"
              : false || item.submitted
              ? "Submitted"
              : false || item.pending
              ? "Pending"
              : false}
          </Text> */}
        </Card.Header>
        <Card.Divider/>
        <Card.Body css={{}}>
          <Text size="$xl" css={{ color: "$accents8" }}>
            {data.data.info}
          </Text>
        <Gallery withDownloadButton>
          {data.data.upload.map((url, index) => {
            return (
              <Item
                original={
                  "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                  url
                }
                key={index}
                height={500}
                width={500}
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={
                      "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                      url
                    }
                    style={{ width: "18%", margin: "1%", borderRadius: 10 }}
                  />
                )}
              </Item>
            );
          })}
        </Gallery>
        </Card.Body>
        <Card.Divider/>
        <Card.Footer css={{  justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{data.data.student_id.name}</Text>
          </Row>
        </Card.Footer>
</Card>
    </>
  );
}
