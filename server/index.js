import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import * as path from 'path';
import { addTask, completeTask, listTasks } from './functions.js';

const PROTO_PATH = path.resolve('./example.proto')

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

const tasksAPI = grpc.loadPackageDefinition(packageDefinition).TasksAPI;

function main() {
  const server = new grpc.Server();
  server.addService(tasksAPI.TasksRPCs.service, { addTask, completeTask, listTasks });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server started");
}

main();
