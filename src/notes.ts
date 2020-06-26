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
  const duplicatedNote = notes.find(note => note.title === title);

  if (!duplicatedNote) {
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

export const listNotes = () => {
  const notes = loadNotes();
  console.log('----------');
  console.log(chalk.blue.bold('Your notes'));
  console.log('----------');

  if (notes.length > 0) {
    notes.forEach(note => console.log(`- ${note.title}`));
  } else {
    console.log('😔 You have 0 notes');
  }
};

export const readNote = (title: string) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.bold(`Title: ${note.title}`));
    console.log(`Body: ${note.body}`);
  } else {
    console.log(chalk.bgRed('😔 No note found'));
  }
};
