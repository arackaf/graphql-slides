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
            To see these slides
          </Heading>
          <Text textColor="secondary">https://github.com/arackaf/graphql-slides</Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            Prior Art
          </Heading>
          <Image src="img/jesseTalk.png" />
          <Text textColor="secondary">http://slides.com/jesseharlin/graph-ql-and-apollo#/</Text>
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
            Primitive?
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
            <ListItem>Query language tying it together</ListItem>
            <ListItem>Nested / Graph-like data</ListItem>
            <ListItem>Just request what you need</ListItem>
            <ListItem>One really smart endpoint, instead of many dumb ones -JH</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading textColor="secondary">Let's explore how do implement this</Heading>
          <Appear order={1}>
            <Text textColor="secondary">Please don't get overwhelmed!</Text>
          </Appear>
        </Slide>
        <Slide transition={["fade"]} bgColor="white">
          <Layout>
            <Appear order={1}>
              <Fill>
                <div style={{ width: 300 }}>
                  <Text style={{ fontSize: "36px" }} textColor="primary">
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
                <div style={{ width: 400 }}>
                  <Text style={{ fontSize: "36px" }} textColor="primary">
                    which includes queries
                  </Text>
                  <CodePane
                    style={{ fontSize: "24px", width: 400 }}
                    lang="javascript"
                    source={`type BookQueryResults {
  Books: [Book]
}
                    
type Query {
  allBooks: BookQueryResults
}`}
                  />
                </div>
              </Fill>
            </Appear>
            &nbsp;
            <Appear order={3}>
              <Fill>
                <div style={{ width: 300 }}>
                  <Text style={{ fontSize: "36px" }} textColor="primary">
                    With arguments
                  </Text>
                  <CodePane
                    style={{ fontSize: "24px", width: 300 }}
                    lang="javascript"
                    source={`type Query {
  getBlog(
    _id: String
  ): BlogResult
}`}
                  />
                </div>
              </Fill>
            </Appear>
          </Layout>
        </Slide>

        <CodeSlide
          transition={["fade"]}
          color="white"
          lang="js"
          code={`allBooks{
  Books{
    _id
    title
  }
}

getBlog(_id: "456"){
  Blog{
    title, 
    content, 
    author{
      name
    }, 
    comments{
      text, 
      moderators{
        name
      },
      author{
        name
      }
    }
  }
}`}
          ranges={[
            { loc: [0, 6], title: "Running a basic query" },
            { loc: [0, 1], title: "Name of the query" },
            { loc: [1, 5], title: "Select results" },
            { loc: [7, 8], title: "Passing arguments" },
            { loc: [11, 14], title: "Nested relationships" },
            { loc: [14, 23], title: "As deeply as needed" }
          ]}
        />

        <Slide transition={["fade"]} bgColor="white">
          <div style={{ width: 600 }} style={{ marginTop: -30 }}>
            <Text style={{ fontSize: "36px" }} textColor="primary">
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
            GraphiQL - your (built-in!) REPL
          </Text>
          <Image width={839} height={294} src="img/graphiQL_basicQuery.png" />
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
                <Text style={{ fontSize: "36px" }} textColor="primary">
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
                  <Text style={{ fontSize: "36px" }} textColor="primary">
                    And the resolver
                  </Text>
                  <CodePane
                    style={{ fontSize: "24px" }}
                    lang="javascript"
                    source={`Query: {
  async allBooks(root, args, ctx, ast) {
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
                  Update the schema
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
                    Update the resolver
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
          color="white"
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
    filters.title = { $regex: ... };
  if (args.title_endsWith)
  // ...

  return await db
    .collection("books")
    .find(filters)
    .toArray();
}`}
          ranges={[
            { loc: [0, 0], title: "Recap" },
            { loc: [3, 4], title: "Property on our type" },
            { loc: [12, 17], title: "To arguments in our query" },
            { loc: [25, 33], title: "To filters in our resolver" }
          ]}
        />

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={4} textColor="secondary">
            We could abstract that boilerplate
          </Heading>
          <Appear order={1}>
            <Text textColor="secondary">Or ...</Text>
          </Appear>
        </Slide>

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
          <Heading size={6} textColor="secondary">
            https://github.com/arackaf/mongo-graphql-starter
          </Heading>
          <br />
          <Image src="img/myRepo.png" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={4} textColor="secondary">
            The (a) benefit of GraphQL is this
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
    args.userId = context.user.id;
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
                  source={`let fieldNode = ast.fieldNodes 
  ? ast.fieldNodes.find(fn => fn.kind == "Field") 
  : ast;

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
            What about selecting data from multiple tables?
          </Heading>
        </Slide>

        <CodeSlide
          transition={["fade"]}
          style={{ color: "white" }}
          lang="js"
          code={`type Person {
  name: String,
  age: Int,
  addressIds: [Int],
  addresses: [Address]
}

type Address {
  _id: Int,
  streetAddress: String
  city: String,
  state: String,
  zip: String
}

export default {
  Person: {
    async addresses(person, args, context, ast) {
      // -------------^
      // the person object for which you need
      // to load addresses

      // fetch the addresses from your database
      return [];
    }
  },
  Query: {
    async allPeople(root, args, context, ast) {
      return [
        { name: "Adam", addressIds: [1, 2, 3] },
        { name: "Bob", addressIds: [4] },
        { name: "Laura", addressIds: [1, 3] }
      ];
    }
  }
};`}
          ranges={[
            { loc: [0, 14], title: "Some types" },
            { loc: [3, 4], title: "Foreign keys" },
            { loc: [4, 5], title: "And their result" },
            { loc: [26, 35], title: "People query" },
            { loc: [16, 26], title: "Get the addresses" },
            { loc: [28, 33], title: "The results" },
            { loc: [17, 25], title: "Get Adam's addresses" },
            { loc: [17, 25], title: "Get Bob's addresses" },
            { loc: [17, 25], title: "Get Laura's addresses" }
          ]}
        />

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            N + 1
          </Heading>
          <Appear order={1}>
            <Image src="img/jimCarreyGross.gif" />
          </Appear>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={5} textColor="secondary">
            https://www.npmjs.com/package/dataloader
          </Heading>
          <br />
          <Image src="img/dataLoader.png" />
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <CodePane
            style={{ fontSize: "28px" }}
            lang="javascript"
            source={`const userLoader = 
  new DataLoader(keys => batchGetUsers(keys));
  // array of keys-----------------------^

userLoader.load(1).then(user => ...;
userLoader.load(2).then(user => ...;

//On event loop tick, dataloader will call 
batchGetUsers([1, 2]);
`}
          />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            Deep breath
          </Heading>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/cuteDog.jpg" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            That's what the server looks like. What about the client?
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={4} textColor="secondary">
            You can absolutely make GraphQL requests with fetch
          </Heading>
          <Appear order={1}>
            <Text textColor="secondary">Or...</Text>
          </Appear>
        </Slide>

        {/*
        <Slide style={{}} transition={["fade"]} bgColor="white">
          <div style={{ width: 900 }}>
            <CodePane
              style={{ fontSize: "16px" }}
              lang="javascript"
              source={`return gqlGet(\`query ALL_BOOKS_V_\${version} {
  allBooks(
    PAGE: \${bookSearch.page}
    PAGE_SIZE: \${bookSearch.pageSize}
    SORT: \${sortObject}
    \${args(
      strArg("title_contains", bookSearch.search),
      strArrArg("subjects_containsAny", Object.keys(bookSearch.subjects)),
      strArg("authors_textContains", bookSearch.author),
      bookSearch.pages != "" 
        ? numArg(bookSearch.pagesOp == "lt" ? "pages_lt" : "pages_gt", bookSearch.pages) 
        : null
    )}
  ){
    Books{
      _id
      title
      isbn
      pages
      smallImage
      subjects
      authors
    }, Meta {count}
  }
}\`).then(resp => {})`}
            />
          </div>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <div style={{ width: 900 }}>
            <CodePane
              style={{ fontSize: "16px" }}
              lang="javascript"
              source={`export const args = (...args) => args.filter(s => s).join("\\n");

export const strArg = (name, value, emptyVal = "") => {
  if (value == null || value === emptyVal) return "";
  return \`\${name}:"\${value}"\`;
};
export const numArg = (name, value, emptyVal = "") => {
  if (value == null || value === emptyVal || isNaN(value)) return "";
  return \`\${name}:\${value}\`;
};
export const boolArg = (name, value, emptyVal = "") => {
  if (value == null || value === emptyVal) return "";
  return \`\${name}:\${value ? true : false}\`;
};

export const strArrArg = (name, values, sendEmpty = false) => {
  if (values == null || (!sendEmpty && !values.length)) return "";
  return \`\${name}:\${JSON.stringify(values)}\`;
};

export const gqlGet = query => fetch(
  \`/graphql?query=\${encodeURIComponent(compress(query))}\`, 
  { credentials: "include" }
).then(resp => resp.json());`}
            />
          </div>
        </Slide>
*/}

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/homer.gif" />
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <div style={{ width: 900 }}>
            <CodePane
              style={{ fontSize: "22px" }}
              lang="javascript"
              source={`import { request } from 'graphql-request'
 
const query = \`query getMovie($title: String!) {
  Movie(title: $title) {
    releaseDate
    actors {
      name
    }
  }
}\`
  
const variables = {
  title: 'Inception'
}
  
request('my-endpoint', query, variables).then(data => console.log(data))`}
            />
          </div>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            Tons of other options, but my favorite is ...
            <Appear order={1}>
              <Image src="img/apollo.png" />
            </Appear>
          </Heading>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <div style={{ width: 900 }}>
            <CodePane
              style={{ fontSize: "22px" }}
              lang="javascript"
              source={`import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
  
class Profile extends Component { ... }

// We use the gql tag to parse our query string into a query document
const CurrentUserForLayout = gql\`
  query CurrentUserForLayout {
    currentUser {
      login
      avatar_url
    }
  }
\`;

const ProfileWithData = graphql(CurrentUserForLayout)(Profile);`}
            />
          </div>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="secondary">
            My own
            <Appear order={1}>
              <Image src="img/micro.png" />
            </Appear>
          </Heading>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <div style={{ width: 900 }}>
            <CodePane
              style={{ fontSize: "22px" }}
              lang="javascript"
              source={`@query(client, props => ({
  query: \`
    query ALL_BOOKS ($page: Int) {
      allBooks(PAGE: $page, PAGE_SIZE: 3) {
        Books {
          _id
          title
        }
      }
    }\`,
  variables: {
    page: props.page
  }
}))
class BooksList extends Component {
  render() {
    let { loading, loaded, data, error } = this.props;`}
            />
          </div>
        </Slide>

        <Slide style={{}} transition={["fade"]} bgColor="white">
          <div style={{ width: 900 }}>
            <CodePane
              style={{ fontSize: "22px" }}
              lang="javascript"
              source={`@mutation(
  client,
  \`mutation modifyBook($title: String) {
    updateBook(_id: $_id, Updates: { title: $title }) {
      Book {
        _id
        title
      }
    }
  }\`
)
class BasicMutation extends Component {
  render() {
    let { running, finished, runMutation } = this.props;`}
            />
          </div>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={1} textColor="secondary">
            Resources
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={5} textColor="secondary">
            https://www.fullstackreact.com/
          </Heading>
          <Image src="img/fsReact.jpg" />
        </Slide>
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={6} textColor="secondary">
            https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b
          </Heading>
          <Image src="img/mediumPart1.png" />
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Image src="img/stubailo.png" />
          <Heading size={6} textColor="secondary">
            https://dev-blog.apollodata.com/the-anatomy-of-a-graphql-query-6dffa9e9e747
          </Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={1} textColor="secondary">
            Questions?
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
