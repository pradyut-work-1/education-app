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

export default function ViewAssignmentView() {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "../api/fetchAssignment?id=" + router.query.id,
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
  const item = { submitted: true };
  return (
    <>
      {console.log(data)}
      <main>
        <Card css={{mt: 15}}>
        <Card.Header>
          <img
            alt="nextui logo"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width="50px"
            height="50px"
          />
          <Grid.Container css={{ pl: "$6" }}>
            <Grid xs={12}>
              <Text h3 css={{ lineHeight: "$xs", m: 0 }}>
                {data.data.title}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text size="$xs" css={{ color: "$accents8" }}>
                {data.data.expiry}
              </Text>
            </Grid>
          </Grid.Container>

          <Text
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
          </Text>
        </Card.Header>
        <Card.Divider/>
        <Card.Body css={{}}>
          <Text size="$xl" css={{ color: "$accents8" }}>
            {data.data.description}
          </Text>
        <Gallery withDownloadButton>
          {data.data.upload.map((url, index) => {
            return (
              <Item
                original={
                  "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                  url
                }
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
            <Text b>{data.data.by.Name}</Text>
          </Row>
        </Card.Footer>
</Card>
      </main>
    </>
  );
}
