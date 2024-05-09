import { Client } from "@elastic/elasticsearch"
let client;
const connection = async () => {
  let connected = false;
  while (!connected) {
    try {
      client = new Client({
        node: "http://elasticsearch:9200",
      });
      const resp = await client.info();
      console.log(resp);
      connected = true;
    } catch (error) {
      console.log(error.message);
    }
  }

  return client;
};

