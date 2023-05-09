import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import * as path from 'path';

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
  const client = new tasksAPI.TasksRPCs('localhost:50051',
    grpc.credentials.createInsecure());

  const request = {
    name: "Learn gRCP",
    responsible: "Artur"
  }

  // client.addTask(request, function (err, response) {
  //   console.log(response || err.details);
  // });

  // client.completeTask({ id: 0 }, function (err, response) {
  //   console.log(response || err.details);
  // })

  // client.listTasks({}, function (err, response) {
  //   console.log(response || err.details);
  // })
}

main();
