const express  = require('express');
const app = express();
const db = require('./db');

app.get('/', async(req, res, next)=> {
  try {
  const widgets = await db.Widget.findAll();
  res.send(`
    <html>
      <head>
        <title>A Sample App</title>
      </head>
      <body>
        <h1>A Sample App</h1>
        ${
          widgets.map( widget => {
            return `<li><a href='/widgets/${widget.id}'>${ widget.name }</a></li>`;
          }).join('')
        }
      </body>
    </html>
  `);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/widgets/:id', async(req, res, next)=> {
  try {
  const widget = await db.Widget.findByPk(req.params.id);
    if(!widget){
      next();
    }
    else {
      res.send(`
        <html>
          <head>
            <title>A Sample App</title>
          </head>
          <body>
            <h1>A Sample App</h1>
            <a href='/'>All Widgets</a>
            <h1>Detail for ${ widget.name }</h1>
          </body>
        </html>
      `);
    }
  }
  catch(ex){
    next(ex);
  }
});

app.use((req, res, next)=> {
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title
      </head>
      <body>
        <h1>Page not found</h1>
        <a href='/'>Try Again</a>
      </body>
    </html>
  `);
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(`
    <html>
      <head>
      </head>
      <body>
        There was an error!!
      </body>
    </html>
  `);

});

const port = 3000;

const init = async()=> {
  try {
    await db.conn.sync({ force: true });
    await db.Widget.create({ name: 'foo' });
    await db.Widget.create({ name: 'bar' });
    await db.Widget.create({ name: 'bazz' });
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
