import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';


// Export Actions

export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      notes: [],
      ...lane,
    }
  };
}

export function createLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;

     dispatch(createLanes(normalizedLanes));
     dispatch(createNotes(notes));
    });
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  };
}

export function deleteLaneRequest(laneId) {
  return (dispatch) => {
    return callApi('lanes/${laneId}', 'delete').then(() => {
      dispatch(deleteLane(laneId));
    });
  };
}

export function editLane(laneId) {
  return {
    type: EDIT_LANE,
    laneId,
  };
}

export function updateLaneRequest(lane, laneId) {
  return (dispatch) => {
    return callApi('lanes/${laneId}', 'put', lane).then((res) => {
      dispatch(editLane(laneId));
      dispatch(updateLane(res));
    });
  };
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}