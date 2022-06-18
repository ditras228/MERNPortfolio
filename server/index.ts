const mongoose = require('mongoose');

require('dotenv').config();
import express = require('express')

const app = express();
const workSchema = require('./schemas/work');
const cors = require('cors');
const infoSchema = require('./schemas/info');
const adminSchema = require('./schemas/admin');
const PORT = process.env.PORT || 5000;
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());

app.post('/auth', async (req: express.Request & any, res: express.Response) => {
  try {
    const data = req.body;
    console.log(data);
    const admin = await adminSchema.find({});
    if (!admin[0]) {
      const hash = await bcrypt.hash(data.password, 5);
      const newAdmin = new adminSchema({
        login: data.login,
        password: hash,
      });
      await newAdmin.save();
      return res.json({message: 'Администратор зарегистрирован!'});
    } else {
      const findByName = await adminSchema.findOne({login: data.login});
      console.log(findByName);
      const compare= bcrypt.compareSync( data.password, findByName.password);
      if (compare) {
        console.log(compare);
        const token = jwt.sign({login: findByName.login}, process.env.JWT_SECRET);
        if (token) {
          return res.json(token);
        }
      }
    }
    return res.status(400).json({message: 'Ошибка авторизации!'});
  } catch (e) {
    console.log(e);
  }
});
app.get('/', async (req: express.Request & any, res: express.Response) => {
  const info = await infoSchema.find({});
  return res.json(info[0]);
});
app.get('/works', async (req: express.Request & any, res: express.Response) => {
  const works = await workSchema.find({});
  return res.json(works);
});
app.post('/info', async (req: express.Request & any, res: express.Response) => {
  try {
    const auth = req.headers.authorization;
    if (jwt.verify(auth, process.env.JWT_SECRET)) {
      await infoSchema.deleteMany();
      const body = req.body;
      const info = new infoSchema({
        image: body.image,
        name: body.name,
        job: body.job,
        desc: body.desc,
        workWidthTittle: body.workWidthTittle,
        workWidth: body.workWidth,
        contacts: body.contacts || [],
      });
      await info.save();
      return res.json(info);
    }
  } catch (e) {
    console.log(e);
  }
});
app.delete('/works', async (req: express.Request & any, res: express.Response) => {
  const auth = req.headers.authorization;
  if (jwt.verify(auth, process.env.JWT_SECRET)) {
    const id = req.query.id;
    const work = await workSchema.findOne({_id: id});
    await work.remove();
    const works = await workSchema.find({});
    return res.json(works);
  }
});
app.post('/works',
    async (req: express.Request & any, res: express.Response) => {
      const auth = req.headers.authorization;
      if (jwt.verify(auth, process.env.JWT_SECRET)) {
        const body = req.body;
        const work = new workSchema({
          name: body.name,
          desc: body.desc,
          tags: body.tags,
          mark: body.mark,
          links: body.links,
        });
        await work.save();
        const works = await workSchema.find({});
        return res.json(works);
      }
    });

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.ohprq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true});
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();


module.exports = app;
