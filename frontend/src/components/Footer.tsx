import { Card, CardBody, List, ListItem } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

export const Footer: FC = () => (
  <Card
    as="footer"
    marginTop={12}
    background={"blue.50"}
    borderTop="1px"
  >
    <CardBody>
      <List>
        <ListItem>
          <Link to="/">Image Prompt Engine</Link>
        </ListItem>
        <ListItem>
          <Link to="/midjourney/prompt-generator">Midjourney Prompt Generator</Link>
        </ListItem>
        <ListItem>
          <Link to="/guides/getting-started-with-midjourney">Getting Started with Midjourney</Link>
        </ListItem>
      </List>
    </CardBody>
  </Card>
);
