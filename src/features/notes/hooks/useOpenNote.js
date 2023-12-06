import { useGetNoteByIdQuery } from "../services/notesSlice";

export const useOpenNote = (id) => { 
  const {data : NoteInfo, isLoading, error} = useGetNoteByIdQuery(id); 

  return { NoteInfo, isLoading, error }
}