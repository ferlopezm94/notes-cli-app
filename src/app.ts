import yargs from 'yargs';

import * as notes from './notes';

yargs.command(
  'add',
  'Add a new note',
  {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  argv => {
    notes.addNote(argv.title, argv.body);
  },
);

yargs.command(
  'remove',
  'Remove a note',
  {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  argv => {
    notes.removeNote(argv.title);
  },
);

yargs.command('list', 'List your notes', () => {
  notes.listNotes();
});

yargs.command(
  'read',
  'Read a note',
  {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  argv => {
    notes.readNote(argv.title);
  },
);

yargs.parse();
