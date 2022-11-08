import {
  Navbar,
  Link,
  Text,
  Avatar,
  Dropdown,
  Card,
  Grid,
  Button,
  Divider,
  Container,
} from "@nextui-org/react";
import { styled } from "@nextui-org/react";

export const Box = styled("div", {
  boxSizing: "border-box",
});

export default function TopBar({ children, back }) {
  const collapseItems = [
    "Schedule",
    "Assignments",
    "Attendance",
    "Discussions",
    "Doubts",
    "Files",
    "Reports",
    "Profile",
    "Log Out",
  ];

  return (
    <>
      <Box
        css={{
          maxW: "100%",
        }}
      >
        <Navbar shouldHideOnScroll isBordered isCompact variant="floating">
          <Navbar.Toggle showIn="xs" />
          <Navbar.Brand
            css={{
              "@xs": {
                w: "12%",
              },
            }}
          >
            <Text b color="inherit" hideIn="xs">
              ACME Classes
            </Text>
          </Navbar.Brand>
          <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                disabledKeys={["info"]}
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item
                  key="info"
                  css={{ height: "$18", color: "$text" }}
                >
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    zoey@example.com
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item key="contact" withDivider>
                  Contact
                </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback">
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem
                key={item}
                activeColor="secondary"
                css={{
                  color: index === collapseItems.length - 1 ? "$error" : "",
                }}
                isActive={index === 2}
              >
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href={item == "Schedule" ? "../index" : "../" + item}
                >
                  {item}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Grid.Container gap={1} justify="start">
            <Grid
              xs={0}
              sm={2}
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  position: "fixed",
                  top: "80px",
                }}
              >
                <Card css={{ placeItems: "start" }}>
                  {collapseItems.map((item, index) => (
                    <div key={item}>
                      <Button
                        activeColor="secondary"
                        css={{
                          color:
                            index === collapseItems.length - 1 ? "$error" : "",
                          textAlign: "start",
                        }}
                        isActive={index === 2}
                        light
                        auto
                        size="lg"
                      >
                        <Link
                          color="inherit"
                          css={{
                            minWidth: "100%",
                          }}
                          href={"../" + item}
                        >
                          {item}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </Card>
              </div>
            </Grid>
            <Grid xs={12} sm={10} md={9}>
              {children}
            </Grid>
            <Grid xs={0} md={1}></Grid>
          </Grid.Container>
        </Container>
      </Box>
    </>
  );
}
