import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("679f8a50001405791cfa");

const account = new Account(client);

export {account,client}