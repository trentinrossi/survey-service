const axios = require('axios').default;
const Survey = require('../model/Survey');

function getAll(req, res) {
  Survey.find()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => res.status(400).json(err));
}

function getById(req, res) {
  Survey.findOne({ _id: req.params.id }).then((result) => {
    if (result === null) {
      res.status(400).json({ error: 'Survey not found' });
    } else {
      res.status(200).json(result);
    }
  });
}

async function insert(req, res) {
  const {
    name,
    initialDate,
    finalDate,
    instructorName,
    evaluatorName,
    description,
    expirationDate,
    objective,
    responseTime,
    anonymous,
    answerLink,
    titleIcon,
    subjects,
  } = req.body;

  const survey = new Survey({
    name,
    initialDate,
    finalDate,
    instructorName,
    evaluatorName,
    description,
    expirationDate,
    objective,
    responseTime,
    anonymous,
    answerLink,
    titleIcon,
  });

  // Fazer uma chamada para o serviço de Question pedindo o documento subject para cada um dos subjects
  const subjectsNotFound = [];
  const subjectsValidated = [];
  for (const subject of subjects) {
    await axios
      .get(`http://localhost:4001/subject/${subject._id}`)
      .then((response) => {
        subjectsValidated.push(subject);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          subjectsNotFound.push(subject);
        } else {
          res.status(500).json(err);
        }
      });
  }

  if (subjectsNotFound.length > 0) {
    res.status(404).json({ error: `Subjects was not found`, subjects: subjectsNotFound });
  } else {
    survey.subjects = subjectsValidated;
    survey
      .save()
      .then((resp) => res.status(201).json(resp))
      .catch((err) =>
        res.status(400).json({ error: `Error to insert survey: ${err}` })
      );
  }
}

function update(req, res) {
  Survey.findOne({ _id: req.params.id }).then((result) => {
    if (result === null) {
      res.status(400).json({ error: 'Survey not found' });
    } else {
      Survey.updateOne({ _id: req.params.id }, { $set: req.body })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json(err));
    }
  });
}

//collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead
function remove(req, res) {
  Survey.findOne({ _id: req.params.id }).then((result) => {
    if (result === null) {
      res.status(400).json({ error: 'Survey not found' });
    } else {
      Survey.remove({ _id: req.params.id })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json(err));
    }
  });
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
