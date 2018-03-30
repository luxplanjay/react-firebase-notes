const getAllNotesIds = state => state.notes.allIds;

export const getAllNotes = state =>
  getAllNotesIds(state).map(id => ({
    ...state.notes.byId[id],
    id,
  }));

export const getNotesIsLoading = state => state.notes.isLoading;
