import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: 'variables.env' });

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`server is running on ${server.address().port}`);
});
