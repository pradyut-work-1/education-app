import useSWR from "swr";
import {
  Loading,
  Grid,
  Text,
  Card,
  Row,
  Button,
  Container,
} from "@nextui-org/react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useRouter } from "next/router";
import Link from "next/link";

function SubmitButton(params) {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "api/fetchAssignmentStatus?id=" + "1" + "&by=" + "123",
    fetcher
  );
  if (error) return <div>{JSON.stringify(error)}</div>;

  if (!data)
    return (
      <div>
        <Grid xs={12} sm={4}>
          123
        </Grid>
      </div>
    );

  const submitted = data.data != null ? true : false;

  const show =
    (router.query.status == "all" ? true : false) ||
    (router.query.status == "expired" && expired && !submitted
      ? true
      : false || (router.query.status == "submitted" && submitted)
      ? true
      : false) ||
    (router.query.status == "pending" && !submitted && !expired ? true : false);
  return <>{show ? "abc" : "xyz"}</>;
}

export default function ViewAssignmentSubmission() {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "../api/fetchAssignmentSubmission?id=" + router.query.id,
    fetcher
  );

  if (error) return <Text>There was an error!</Text>;

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
      {data.data === null ? 
      <Row>
        <Button>
        <Link href={"./Submit?id=" + router.query.id} >
          <Text b css={{color: 'white'}} >Submit Assignment</Text>
          
        </Link>
        </Button>
      </Row>
      : 
      <Card>
        <Card.Header>
          <Text h4>Your submisssion:</Text>
        </Card.Header>
        <Card.Body>
          <Text>{data.data.description}</Text>

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
      </Card>}
    </>
  );
}
