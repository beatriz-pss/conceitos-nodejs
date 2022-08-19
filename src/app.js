const express = require("express");
const cors = require("cors");

const {uuid} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    like: 0,
  }

  repositories.push(repository);
  return response.json(repository);

  repositories.push(repository);
  return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const findRepositoryIndex = repositories.findIndex(repositories.id == id);
  const repository = {
    id, 
    title,
    url,
    techs, 
    likes: repositories[findRepositoryIndex] = likeyarn 
  };

  repositories[findRepositoryIndex] = repository
  return response.json(repository);

  if (findRepositoryIndex == -1){
    return response.status(400).json({error: 'Repository does not exists.'});
  }

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const findRepositoryIndex= repositories.findIndex(repositories.id == id);

  if(findRepositoryIndex >= 0){
    repositories.splice(findRepositoryIndex, 1);
  } else{
    return response.status(400).json({ error: 'Repository does not exists.'});
  }

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const findRepositoryIndex= repositories.findIndex(repositories.id == id);

  if (findRepositoryIndex == -1){
    return response.status(400).json({error: 'Repository does not exists.'});
  }

  repositories[findRepositoryIndex].likes++;

  return response.jsnon(repositories[findRepositoryIndex]);

});

module.exports = app;
