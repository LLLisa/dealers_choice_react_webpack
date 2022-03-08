//db----------------------------------
const faker = require('faker');
const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL ||
    'postgres://localhost/dealers_choice_react_webpack',
  { logging: false } //love this
);

const Human = db.define('human', {
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

const createHuman = async (num) => {
  try {
    for (let i = 0; i < num; i++) {
      await Human.create({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const seedDb = async () => {
  try {
    await db.sync({ force: true });
    await createHuman(10);
  } catch (error) {
    console.log(error);
  }
};

//server------------------------------------
const express = require('express');
const app = express();
const path = require('path');
const { sendStatus } = require('express/lib/response');

app.use('/dist', express.static(path.join(__dirname, 'dist'))); //smh
app.use('/client', express.static(path.join(__dirname, 'client')));

const init = async () => {
  try {
    await seedDb();
    console.log('-----synced-----');
    const port = process.env.PORT || 9001;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();

//routes-------------------------------------------
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/babe', (req, res) => {
  res.send('hello babe');
});

app.get('/api/humans', async (req, res, next) => {
  try {
    const response = await Human.findAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

app.post('/api/humans', async (req, res, next) => {
  try {
    const newHuman = await Human.create({
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
    });
    res.send(newHuman);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/humans/:doomed', async (req, res, next) => {
  try {
    const doomedHuman = await Human.findByPk(req.params.doomed);
    await doomedHuman.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
