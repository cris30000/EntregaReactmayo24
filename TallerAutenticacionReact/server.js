const jsonServer = require('json-server');
const auth=require('json-server-auth');
const cors = require('cors');
const rules=require('./rules.json');

const app = jsonServer.create();
const router = jsonServer.router('db.json');


app.db = router.db;


app.use(cors());
app.use(auth.rewriter(rules));
app.use(auth);
app.use(router);
app.listen(3000, () => {
console.log('Servidor corriendo en http://localhost:3000');
});