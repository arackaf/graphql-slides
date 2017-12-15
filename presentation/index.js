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
    primary: "#222233",
    secondary: "#AACCFF",
    tertiary: "#03A9FC",
    quartenary: "#CECECE"
  },
  {
    primary: "#AACCFF",
    secondary: "Helvetica"
  }
);
// const theme = createTheme(
//   {
//     primary: "white",
//     secondary: "#1F2022",
//     tertiary: "#03A9FC",
//     quartenary: "#CECECE"
//   },
//   {
//     primary: "Montserrat",
//     secondary: "Helvetica"
//   }
// );

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transitionDuration={500} theme={theme}>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            GraphQL on the server
          </Heading>
          <Text margin="10px 0 0" textColor="secondary" size={1} fit bold>
            With MongoDB (or anything, really)
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">What do these have in common?</Heading>
          <List textColor="secondary">
            <ListItem>Web Components</ListItem>
            <ListItem>Service Worker</ListItem>
            <ListItem>GraphQL</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">They're primitives</Heading>
          <Text textColor="secondary">(but that's ok!)</Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">Why GraphQL?</Heading>
          <List textColor="secondary">
            <ListItem>Type system for queries</ListItem>
            <ListItem>Nested / Graph-like data</ListItem>
            <ListItem>Query language tying it together</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="white">
          <Layout>
            <Appear order={1}>
              <Fill>
                <CodePane
                  style={{ fontSize: "24px" }}
                  lang="javascript"
                  source={`
type Book {
  _id: String
  isbn: String
  title: String
  userId: String
  publisher: String
  pages: String
  authors: [String]
}

type Query {
  allBooks: [Book]
}`}
                />
              </Fill>
            </Appear>
            &nbsp;
            <Appear order={2}>
              <Fill>
                <CodePane
                  width={600}
                  style={{ fontSize: "24px", width: 600 }}
                  lang="javascript"
                  source={`
Query: {
  async allBooks(root, args, req, ast) {
    let db = await root.db;
    return await db
      .collection("books")
      .find({})
      .toArray();
  }
}
          `}
                />
              </Fill>
            </Appear>
          </Layout>
        </Slide>
        <Slide transition={["fade"]} bgColor="white">
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
        <Slide transition={["fade"]} bgColor="primary">
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
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={6} textColor="primary" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="primary">
            Heading 1
          </Heading>
          <Heading size={2} textColor="primary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="primary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="primary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="primary">
            Heading 5
          </Heading>
          <Text size={6} textColor="primary">
            Standard text
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="primary">
          <Heading size={6} textColor="primary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
