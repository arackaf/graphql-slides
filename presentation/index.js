// Import React
import React from "react";

// Import Spectacle Core tags
import { Appear, BlockQuote, Cite, Deck, Fill, Fit, Heading, Layout, ListItem, List, Quote, Slide, Text, Code, CodePane } from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <CodePane
            style={{ fontSize: "24px" }}
            lang="javascript"
            source={`
let i = 12; 
(function(){
  alert(i);
})();
          `}
          />
        </Slide>
        <Slide>
          <Layout>
            <Fill>
              <CodePane
                style={{ fontSize: "24px" }}
                lang="javascript"
                source={`
let i = 12; 
(function(){
  alert(i);
})();
          `}
              />
            </Fill>
            &nbsp;
            <Fill>
              <CodePane
                style={{ fontSize: "24px" }}
                lang="javascript"
                source={`
const j = 12; 
for (let i = 0; i < j; i++){
  alert(i);
}
          `}
              />
            </Fill>
          </Layout>
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <Appear order={1}>
            <Heading size={6} textColor="primary" caps>
              Hello
            </Heading>
          </Appear>
          <Appear order={2}>
            <Heading size={6} textColor="primary" caps>
              World
            </Heading>
          </Appear>
          <Appear order={3}>
            <Heading size={6} textColor="primary" caps>
              Adam
            </Heading>
          </Appear>
          <Appear order={4}>
            <Heading size={6} textColor="primary" caps>
              Rackis
            </Heading>
          </Appear>
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="secondary">
            Heading 1
          </Heading>
          <Heading size={2} textColor="secondary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="secondary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="secondary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="secondary">
            Heading 5
          </Heading>
          <Text size={6} textColor="secondary">
            Standard text
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
