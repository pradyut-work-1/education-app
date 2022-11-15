import { Card, Collapse, Grid, Text } from "@nextui-org/react";

export default function ReportsInfoBlock({ subject, date, obtained, total }) {
  return (
    <Card>
      <Collapse.Group accordion={false}>
        <Collapse
          title={
            (subject == 1 ? "English" : null) ||
            (subject == 2 ? "Hindi" : null) ||
            (subject == 3 ? "Marathi" : null) ||
            (subject == 4 ? "Science I" : null) ||
            (subject == 5 ? "Science II" : null) ||
            (subject == 6 ? "Maths I" : null) ||
            (subject == 7 ? "Maths II" : null)
          }
          subtitle={new Date(date).toLocaleDateString()}
          css={{ p: 0 }}
        >
          <Grid.Container>
            <Grid
              xs={4}
              css={{ flexDirection: "column", alignItems: "center" }}
            >
              <Text h4 css={{ m: 0 }}>
                Obtained
              </Text>
              <Text b>{obtained}</Text>
            </Grid>
            <Grid
              xs={4}
              css={{ flexDirection: "column", alignItems: "center" }}
            >
              <Text h4 css={{ m: 0 }}>
                Total
              </Text>
              <Text b>{total}</Text>
            </Grid>
            <Grid
              xs={4}
              css={{ flexDirection: "column", alignItems: "center" }}
            >
              <Text h4 css={{ m: 0 }}>
                Percentage
              </Text>
              <Text b>{
              ~~((obtained/total)*100)
              }%</Text>
            </Grid>
          </Grid.Container>
        </Collapse>
      </Collapse.Group>
    </Card>
  );
}
