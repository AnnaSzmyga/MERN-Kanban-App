import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';

export function getSomething(req, res) {
 return res.status(200).end();
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function updateLaneName(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.name = req.body.name;
    lane.save((err, updated) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(updated);
    });     
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    // remove lane
    lane.remove(() => {
      res.status(200).end();
    });

    // remove all notes from deleted lane
    if (lane.notes) {
      const notesIds = [];
      lane.notes.forEach((note => notesIds.push(note.id)));
      
      notesIds.map((id) => {
        Note.findOne({ id: id }).exec((err, note) => {
          if (err) {
            res.status(500).send(err);
          }

          note.remove(() => {
            res.status(200).end();
          });
        });
      }) 
    }   
  });
}




