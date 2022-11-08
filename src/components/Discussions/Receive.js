import { Card, Text, Grid } from "@nextui-org/react";
const Receive = ({ by, content, date }) => {
    return (
      <Grid xs={12} css={{ px: 0, flexDirection: "column" }}>
        <Text size="$xs" css={{ textAlign: "left" }} b>
          {by}
        </Text>
        <Card
          id="abc1"
          isPressable
          // variant="flat"
          css={{
            maxWidth: "75%",
            borderTopLeftRadius: "2px",
            width: "max-content",
            zIndex: "",
            minWidth: "fit-content",
          }}
        >
          <Card.Body css={{ padding: "0px 10px" }}>
            <Text size="$md" b>
              {content}{" "}
            </Text>
          </Card.Body>
          <Card.Footer css={{ p: "0px 10px", justifyContent: "flex-end" }}>
            <Text size="$xs" css={{ textAlign: "right" }}>
              {new Date(date).toLocaleTimeString()}
            </Text>
          </Card.Footer>
        </Card>
      </Grid>
    );
  };

  export default Receive;