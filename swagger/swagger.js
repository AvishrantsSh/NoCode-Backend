const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "No Code API",
    description:
      "Documentation automatically generated by the <b>swagger-autogen</b> module.",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    bearer_key: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
  security: [
    {
      bearer_key: [],
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
