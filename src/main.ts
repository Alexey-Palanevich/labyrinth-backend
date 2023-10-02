import { bootstrap } from './infra';

const PORT = +process.env.PORT || 3000;

bootstrap(PORT).then(() => {
  console.log(`Server has been started on ${PORT} port.`);
});
