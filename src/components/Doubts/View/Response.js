import { Card, Collapse, Text, Grid, Loading, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect } from "react";

export default function ViewDoubtsResponse(params) {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "../api/fetchDoubtResponse?id=" + router.query.id,
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
      {data.data === null ? (
        
        <Card>
          <Collapse.Group accordion={false}>
            <Collapse title={<Text b>Solution</Text>}>
              <Text>The Doubt hasnt been solved {":("}</Text>
            </Collapse>
          </Collapse.Group>
        </Card>
      ) : (
        <Card>
          <Collapse.Group accordion={false}>
            <Collapse title={<Text b>Solution</Text>}>
              <Text>{data.data.info}</Text>
              <Gallery withDownloadButton>
                {data.data.upload.map((url, index) => {
                  return (
                    <Item
                      kry={index}
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
                          style={{
                            width: "18%",
                            margin: "1%",
                            borderRadius: 10,
                          }}
                        />
                      )}
                    </Item>
                  );
                })}
              </Gallery>
              <Spacer y={0.5} />
              <Text>{data.data.by.Name}</Text>
            </Collapse>
          </Collapse.Group>
        </Card>
      )}
    </>
  );
}
