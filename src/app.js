import {MongoClient, ObjectID} from "mongodb";
import {GraphQLServer} from "graphql-yoga";
import Mutation from './resolvers/Mutation';
import * as uuid from 'uuid';
import "babel-polyfill";


const usr = "avalero";
const pwd = "123456abc";
const url = "cluster0-vbkmi.gcp.mongodb.net/test?retryWrites=true&w=majority";
const connectToDb = async function(usr, pwd, url) {
    const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    await client.connect();
    return client;
};
const runGraphQLServer = function(context){
    const resolvers = {
        Mutation,
    }//ahora a typedefs le pasamos la ruta de donde están
    const server = new GraphQLServer({ typeDefs: './src/schema.graphql', resolvers, context });
  const options = {
    port: 8000
  };

  try {
    server.start(options, ({ port }) =>
      console.log(
        `Server started, listening on port ${port} for incoming requests.`
      )
    );
  } catch (e) {
    console.info(e);
    server.close();
  }
};

const runApp = async function() {
  const client = await connectToDb(usr, pwd, url);
  console.log("Connect to Mongo DB");
  try {
    runGraphQLServer({ client });
    //En la otra le paso db: definicion... y esa mierda
  } catch (e) {
      console.log(e)
    client.close();
  }
};

runApp();