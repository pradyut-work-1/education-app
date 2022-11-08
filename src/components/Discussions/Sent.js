import { Grid, Card, Text } from "@nextui-org/react";

const Sent = ({ content, date }) => {
    return (
      <Grid xs={12} css={{ px: 0 }} justify="end">
        <Card
          isPressable
          variant="flat"
          css={{
            maxWidth: "75%",
            borderBottomRightRadius: "2px",
            width: "max-content",
            bg: "$accents3",
            minWidth: "fit-content",
            mt: 10,
          }}
        >
          <Card.Body css={{ padding: "0px 10px" }}>
            <Text size="$md" b>
              {content}
            </Text>
          </Card.Body>
          <Card.Footer css={{ p: "0px 10px", justifyContent: "flex-end" }}>
            <Text size="$xs" css={{ textAlign: "left" }}>
              {new Date(date).toLocaleTimeString()}
            </Text>
          </Card.Footer>
        </Card>
      </Grid>
    );
  };

  export default Sent;