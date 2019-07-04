import { deleteNoteRequest, editNote, updateNoteRequest, moveWithinLane } from '../Note/NoteActions';
import { connect } from 'react-redux';
import Notes from './Notes';

const mapDispatchToProps = {
  onValueClick: editNote,
  onUpdate: updateNoteRequest,
  onDelete: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);