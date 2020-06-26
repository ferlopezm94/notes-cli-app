import chalk from 'chalk';
import fs from 'fs';

const NOTES_FILENAME = `${__dirname}/db.json`;

interface Note {
  title: string;
  body: string;
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(NOTES_FILENAME);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON) as Note[];
    return data;
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes: Note[]) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(NOTES_FILENAME, dataJSON);
};

export const addNote = (title: string, body: string) => {
  const notes = loadNotes();
  const duplicatedNotes = notes.filter(note => note.title === title);

  if (duplicatedNotes.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.bgGreen('✔️ New note added!'));
  } else {
    console.log(chalk.bgRed('😔 Note title taken'));
  }
};

export const removeNote = (title: string) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.bgGreen('✔️ Note removed!'));
  } else {
    console.log(chalk.bgRed('😔 No note found'));
  }
};
