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

function insert(req, res) {
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

  // Fazer uma chamada em gRPC para o serviço de Question pedindo o document para cada um dos subjects
  

  survey
    .save()
    .then((resp) => res.status(201).json(resp))
    .catch((err) =>
      res.status(400).json({ error: `Error to insert survey: ${err}` })
    );
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
