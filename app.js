const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/students', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  res.json(data.students);
});

app.post('/api/students', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  const student = { id: String(Date.now()), ...req.body };
  data.students.push(student);
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
  res.status(201).json(student);
});

app.put('/api/students/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  const index = data.students.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'not found' });
  data.students[index] = { ...data.students[index], ...req.body, id: req.params.id };
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
  res.json(data.students[index]);
});

app.delete('/api/students/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  data.students = data.students.filter((s) => s.id !== req.params.id);
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`);
});
