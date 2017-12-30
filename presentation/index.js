// Import React
import React from "react";

// Import Spectacle Core tags
import { Appear, BlockQuote, Cite, Deck, Fill, Fit, Heading, Layout, ListItem, List, Quote, Slide, Text, Code, CodePane, Image } from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

import CodeSlide from "spectacle-code-slide";

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
          <Heading size={3} textColor="secondary">
            What do these have in common?
          </Heading>
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
          <Heading size={3} textColor="secondary">
            Primitives?
          </Heading>
          <List textColor="secondary">
            <ListItem>Low-level, useful tool</ListItem>
            <ListItem>Inconvenient to use directly—BUT...</ListItem>
            <ListItem>Can be built on easily</ListItem>
            <ListItem>Low level</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            Why GraphQL?
          </Heading>
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
                    source={`type Book {
  _id: String
  isbn: String
  title: String
  userId: String
  publisher: String
  pages: String
  authors: [String]
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
                    style={{ fontSize: "24px", width: 300 }}
                    lang="javascript"
                    source={`type Query {
  allBooks: [Book]
}`}
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
              source={`import { makeExecutableSchema } from "graphql-tools";

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

        <Slide transition={["fade"]} bgColor="white">
          <div style={{ width: 600 }} style={{ marginTop: -30 }}>
            <Text style={{ fontSize: "36px" }} textColor="secondary">
              Get your server up and running
            </Text>
            <CodePane
              style={{ fontSize: "20px", width: 850 }}
              lang="javascript"
              source={`getBlog(_id: \"\${obj._id}\"){
  Blog{
    title, 
    content, 
    author{
      name, 
      favoriteTag{
        name
      }
    }, 
    comments{
      text, 
      reviewers{
        name
      },
      author{
        name
      }
    }
  }
}`}
            />
          </div>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            How do we get that query working?
          </Heading>
          <Appear order={1}>
            <Text margin="20px 0 0" textColor="secondary" size={1} bold>
              You do it yourself
            </Text>
          </Appear>
        </Slide>

        <Slide transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ width: 300 }}>
                <Text style={{ fontSize: "36px" }} textColor="secondary">
                  Query from before
                </Text>
                <CodePane
                  style={{ fontSize: "24px" }}
                  lang="javascript"
                  source={`type Query {
  allBooks: [Book]
}`}
                />
              </div>
            </Fill>
            <Fill>
              <Appear order={1}>
                <div style={{ width: 600 }}>
                  <Text style={{ fontSize: "36px" }} textColor="secondary">
                    And the resolver
                  </Text>
                  <CodePane
                    style={{ fontSize: "24px" }}
                    lang="javascript"
                    source={`Query: {
  async allBooks(root, args, req, ast) {
    let db = await root.db;
    return await db
      .collection("books")
      .find({})
      .toArray();
  }
}`}
                  />
                </div>
              </Appear>
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/kidEww.jpg" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            Let's make the query more realistic
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
                  source={`type Query {
  allBooks(
    title: String
  ): [Book]
}`}
                />
              </div>
            </Fill>
            <Fill>
              <Appear order={1}>
                <div style={{ width: 600 }}>
                  <Text style={{ fontSize: "36px" }} textColor="secondary">
                    And the resolver
                  </Text>
                  <CodePane
                    style={{ fontSize: "24px" }}
                    lang="javascript"
                    source={`Query: {
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
              </Appear>
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={2} textColor="secondary">
            Let's make the query <i>even more</i> realistic
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
                  source={`type Query {
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
                    source={`Query: {
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
                  source={`type Book {
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
                  source={`type Query {
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
          <Heading size={3} textColor="secondary">
            To review
          </Heading>
          <List textColor="secondary">
            <ListItem>We have to implement all our queries</ListItem>
            <ListItem>We have to map and implement our filters</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            But do we <i>really</i> have to...
          </Heading>
          <br />
          <Image src="img/trap.jpg" />
        </Slide>

        <CodeSlide
          transition={["fade"]}
          style={{ color: "white" }}
          lang="js"
          code={`type Book {
  _id: String
  isbn: String
  title: String
  userId: String
  publisher: String
  pages: String
  authors: [String]
}
          
type Query {
  allBooks(
    title: String
    title_in: [String]
    title_contains: String
    title_startsWith: String
    title_endsWith: String
  ): [Book]
}


async allBooks(root, args, context, ast) {
  let db = await root.db;
  let filters = {};

  if (args.title) 
    filters.title = args.title;
  if (args.title_in) 
    filters.title = { $in: args.title_in };

  if (args.title_startsWith)
    filters.title = { $regex: new RegExp("^" + args.title_startsWith, "i") };
  if (args.title_endsWith)
    filters.title = { $regex: new RegExp(args.title_endsWith + "$", "i") };
  if (args.title_contains)
    filters.title = { $regex: new RegExp(args.title_contains, "i") };

  return await db
    .collection("books")
    .find(filters)
    .toArray();
}`}
          ranges={[
            { loc: [0, 0], title: "What does this boil down to" },
            { loc: [3, 4], title: "Property on our type" },
            { loc: [12, 17], title: "To arguments in our query" },
            { loc: [25, 36], title: "To filters in our resolver" }
          ]}
        />

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={4} textColor="secondary">
            Someone else can generate the boilerplate
          </Heading>
          <Image src="img/homer.gif" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={6} textColor="secondary">
            Awesome GraphQL
          </Heading>
          <Image src="img/awesomeGQL.png" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={4} textColor="secondary">
            Have someone else generate EVERYTHING
          </Heading>
          <br />
          <Layout>
            <Fill>
              <Image src="img/homer.gif" />
            </Fill>
            &nbsp; &nbsp;
            <Fill>
              <Image src="img/homer.gif" />
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/graphCool.png" />
          <br />
          <Heading size={4} textColor="secondary">
            GraphQL + backend as a service
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            But honestly doing it yourself is not hard
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/myRepo.png" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={4} textColor="secondary">
            The point of GraphQL is this
          </Heading>
          <br />
          <Text textColor="secondary">
            By representing all of our queries and mutations in a rich, standardized query language, our data layer becomes a thin mapping connecting
            these operations to whatever data backend we happen to use.
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            FAQs / Likely questions
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            What about authentication?
          </Heading>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ width: 800, marginLeft: "30px" }}>
                <CodePane
                  style={{ fontSize: "28px" }}
                  lang="javascript"
                  source={`
Query: {
  async allBooks(root, args, context, ast) {
    // ------------------------^
    // that's the request object from Express
    // with your authenticated user object

    // Plug it into some sort of 
    // cross-cutting middleware

    return [];
  }
}`}
                />
              </div>
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ width: 800, marginLeft: "30px", marginTop: -50 }}>
                <CodePane
                  style={{ fontSize: "17px" }}
                  lang="javascript"
                  source={`
export default class BooksMiddleware {
  async queryPreprocess(root, args, context, ast) {
    args.userId = args.publicUserId || context.user.id;
    if (args.PAGE_SIZE > 100) {
      args.PAGE_SIZE = 100; //don't allow user to request too much data
    }
  }
  queryMiddleware(queryPacket, root, args, context, ast) {
    let { $project, $sort } = queryPacket;
    $project.titleLower = { $toLower: "$title" };
    if (typeof $sort.title !== "undefined") {
      $sort.titleLower = $sort.title;
      delete $sort.title;
    }
  }
  async beforeUpdate(match, updates, root, args, context, ast) {
    match.userId = context.user.id;
    if (/^\\/uploads\\//.test(updates.$set.smallImage)) {
      updates.$set.smallImage = await saveLocalImageToS3(updates.$set.smallImage);
    }
  }
  adjustResults(results) {
    results.forEach(book => book.dateAdded = +book._id.getTimestamp());
  }
}`}
                />
              </div>
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            What about selecting only queried fields
          </Heading>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ width: 800, marginLeft: "30px" }}>
                <CodePane
                  style={{ fontSize: "28px" }}
                  lang="javascript"
                  source={`
Query: {
  async allBooks(root, args, context, ast) {
    // --------------------------------^
    // that's the abstract syntax tree of the 
    // current query.  Inspect it to see what 
    // was requested 

    return [];
  }
}`}
                />
              </div>
            </Fill>
          </Layout>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <Layout>
            <Fill>
              <div style={{ width: 800 }}>
                <CodePane
                  style={{ fontSize: "22px" }}
                  lang="javascript"
                  source={`export function getNestedQueryInfo(ast, queryName) {
  let fieldNode = ast.fieldNodes.find(fn => fn.kind == "Field");

  // ...

  let selections = new Map(
    fieldNode.selectionSet.selections.map(
      sel => [
        sel.name.value, 
        sel.selectionSet == null ? true : getSelections(sel)
      ]
    )
  );`}
                />
              </div>
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            That's what the server looks like. What about the client?
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
