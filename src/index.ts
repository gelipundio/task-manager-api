import express from 'express';
import bodyParser from 'body-parser';
import { v4 } from 'uuid';

const app = express();

let tasks = []; // { id, title, completed }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

app.get('/items', (req, res) => {
  const name = process.env.NAME || 'World';
  
  res.json({ 
    tasks 
  });
}); 

app.post('/items', (req, res) => {
  const name = process.env.NAME || 'World';

  if (!req.body.title) res.status(400).json({ error: 'No title in request' });

  tasks.push({
    id: v4(),
    title: req.body.title,
    completed: false
  });

  res.send('saved');
});

app.put('/items/:id', (req, res) => {
  const name = process.env.NAME || 'World';
  if(!req.params.id) res.status(400).json({ error: 'No id' })
  if (!req.body.title && !req.body.completed) res.status(400).json({ error: 'No data to modify' });

  tasks = tasks.map(t => {
    if(t.id === req.params.id) {
      return {
        ...t,
        title: req.body.title ?? t.title,
        completed: req.body.completed ?? t.completed
      }
    };
    return t;
  });

  res.send(`ok ${req.params.id} modified`);
});

app.delete('/items/:id', (req, res) => {
  const name = process.env.NAME || 'World';

  tasks = tasks.filter(t => t.id !== req.params.id);

  res.send(`${req.params.id} deleted`);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
