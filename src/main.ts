import { bootstrap } from './infra';

bootstrap().then((port) => {
  console.log(`Server has been started on ${port} port.`);
});
