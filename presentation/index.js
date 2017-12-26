// Import React
import React from "react";

// Import Spectacle Core tags
import { Appear, BlockQuote, Cite, Deck, Fill, Fit, Heading, Layout, ListItem, List, Quote, Slide, Text, Code, CodePane, Image } from "spectacle";

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
          <Heading textColor="secondary">
            GraphQL:<br />what how and why
          </Heading>
          <Text margin="20px 0 0" textColor="secondary" size={1} bold>
            Adam Rackis
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
          <Text textColor="secondary">(and that's a good thing!)</Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">Why GraphQL?</Heading>
          <List textColor="secondary">
            <ListItem>Type system for queries</ListItem>
            <ListItem>Nested / Graph-like data</ListItem>
            <ListItem>Query language tying it together</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">A quick tour</Heading>
        </Slide>
        <Slide transition={["fade"]} bgColor="white">
          <Layout>
            <Appear order={1}>
              <Fill>
                <div style={{ width: 300 }}>
                  <Text style={{ fontSize: "36px" }} textColor="secondary">
                    Declare the schema
                  </Text>
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
                </div>
              </Fill>
            </Appear>
            &nbsp;
            <Appear order={2}>
              <Fill>
                <div style={{ width: 250 }}>
                  <Text style={{ fontSize: "36px" }} textColor="secondary">
                    And the query
                  </Text>
                  <CodePane
                    style={{ fontSize: "24px", width: 200 }}
                    lang="javascript"
                    source={`
{
  allBooks {
    isbn
    title
  }
}
                    `}
                  />
                </div>
              </Fill>
            </Appear>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="white">
          <div style={{ width: 600 }} style={{ marginTop: -30 }}>
            <Text style={{ fontSize: "36px" }} textColor="secondary">
              Get your server up and running
            </Text>
            <CodePane
              style={{ fontSize: "24px", width: 850 }}
              lang="javascript"
              source={`
const db = MongoClient.connect(MONGO_CONNECTION);
const root = { db };
const executableSchema = makeExecutableSchema({ 
  typeDefs: schema, 
  resolvers 
});

app.use(
  "/graphql",
  expressGraphql({
    schema: executableSchema,
    graphiql: true,
    rootValue: root
  })
);
          `}
            />
          </div>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Text style={{ fontSize: "36px" }} textColor="secondary">
            Execute the query
          </Text>
          <Image width={839} height={294} src="img/graphiQL_basicQuery.png" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading style={{ fontSize: "86px" }} textColor="secondary">
            How do we get that query working?
          </Heading>
          <Appear order={1}>
            <Text margin="20px 0 0" textColor="secondary" size={1} bold>
              You do it yourself
            </Text>
          </Appear>
        </Slide>

        <Slide transition={["fade"]} bgColor="white">
          <div style={{ width: 600 }}>
            <CodePane
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
          </div>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/kidEww.jpg" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading style={{ fontSize: "72px" }} textColor="secondary">
            Lets make the query more realistic
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ width: 300 }}>
                <Text style={{ fontSize: "36px" }} textColor="secondary">
                  Update the schema
                </Text>
                <CodePane
                  style={{ fontSize: "24px" }}
                  lang="javascript"
                  source={`
type Query {
  allBooks(
    title: String
  ): [Book]
}`}
                />
              </div>
            </Fill>
            <Fill>
              <div style={{ width: 600 }}>
                <Text style={{ fontSize: "36px" }} textColor="secondary">
                  And the resolver
                </Text>
                <CodePane
                  style={{ fontSize: "24px" }}
                  lang="javascript"
                  source={`
Query: {
  async allBooks(root, args, context, ast) {
    let db = await root.db;
    let filters = {};

    if (args.title) {
      filters.title = args.title;
    }

    return await db
      .collection("books")
      .find(filters)
      .toArray();
  }
}`}
                />
              </div>
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading style={{ fontSize: "72px" }} textColor="secondary">
            Lets make the query more realistic
          </Heading>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ marginLeft: -200, width: 400 }}>
                <Text style={{ fontSize: "36px" }} textColor="secondary">
                  Declare the schema
                </Text>
                <CodePane
                  style={{ fontSize: "24px" }}
                  lang="javascript"
                  source={`
type Query {
  allBooks(
    title: String
    title_in: [String]
    title_contains: String
    title_startsWith: String
    title_endsWith: String
  ): [Book]
}`}
                />
              </div>
            </Fill>
            <Appear order={1}>
              <Fill>
                <div style={{ width: 800, marginLeft: "30px" }}>
                  <Text style={{ fontSize: "36px" }} textColor="secondary">
                    Declare the schema
                  </Text>
                  <CodePane
                    style={{ fontSize: "14px" }}
                    lang="javascript"
                    source={`
Query: {
  async allBooks(root, args, context, ast) {
    let db = await root.db;
    let filters = {};

    if (args.title) {
      filters.title = args.title;
    }
    if (args.title_in) {
      filters.title = { $in: args.title_in };
    }
    if (args.title_startsWith) {
      filters.title = { $regex: new RegExp("^" + args.title_startsWith, "i") };
    }
    if (args.title_endsWith) {
      filters.title = { $regex: new RegExp(args.title_endsWith + "$", "i") };
    }
    if (args.title_contains) {
      filters.title = { $regex: new RegExp(args.title_contains, "i") };
    }

    return await db
      .collection("books")
      .find(filters)
      .toArray();
  }
}`}
                  />
                </div>
              </Fill>
            </Appear>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/reactionGif.gif" />
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ width: 300, marginLeft: -100 }}>
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
              </div>
            </Fill>
            <Fill>
              <div style={{ marginLeft: -200, width: 600 }}>
                <CodePane
                  style={{ fontSize: "16px" }}
                  lang="javascript"
                  source={`
type Query {
  allBooks(
    title: String
    title_in: [String]
    title_contains: String
    title_startsWith: String
    title_endsWith: String

    publisher: String
    publisher_in: [String]
    publisher_contains: String
    publisher_startsWith: String
    publisher_endsWith: String

    authors: [String]
    authors_has: String
    publisher_contains: String
    publisher_startsWith: String
    publisher_endsWith: String    

    pages: lt: Int
    pages: gt: Int
  ): [Book]
}`}
                />
              </div>
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/jimCarreyGross.gif" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">To review</Heading>
          <List textColor="secondary">
            <ListItem>We have to implement all our queries</ListItem>
            <ListItem>We have to map and implement our filter</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">
            But do we <i>really</i> have to...
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/homer.gif" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/awesomeGQL.png" />
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
            <Appear order={2}>
              <Fill />
            </Appear>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
