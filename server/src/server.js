import config from 'config';
import logger from './helpers/logger';
import app from './app';
import sockets from './sockets';

const port = process.env.PORT || config.get('port');

const server = app.listen(port, () => {
  logger.info(`server is running on ${port}`);
});

sockets.init(server);

export default server;
