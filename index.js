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

const generateRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandomValueFromArray = (array) => {
  // Generate a random index within the range of the array's length
  var randomIndex = Math.floor(Math.random() * array.length);
  // Return the element at the random index
  return array[randomIndex];
};

const main = async () => {
  await connection();
  const apps = ["CMI", "CRM", "DATAFAS", "MARAQI"];
  setInterval(async () => {
    try {
      await client.index({
        index: "pm2_logs",
        body: {
          app: getRandomValueFromArray(apps),
          log: generateRandomString(30),
          date: new Date(),
        },
      });
      //   console.log({
      //     app: getRandomValueFromArray(apps),
      //     log: generateRandomString(30),
      //     date: new Date(),
      //   });
    } catch (error) {
      console.log("error while inserting new row");
    }
  }, 1000);

  // return client;
};



main();


