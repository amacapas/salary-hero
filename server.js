import express from "express";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema/index.js";

const app = express();

app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () =>
  console.log(`Server running on localhost:${process.env.PORT}`)
);
