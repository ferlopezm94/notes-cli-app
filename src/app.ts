import yargs from 'yargs';

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
    console.log('Title :>> ', argv.title);
    console.log('Body :>> ', argv.body);
  },
);

yargs.command('remove', 'Remove a note', () => {
  console.log('Removing the note');
});

yargs.command('list', 'List your notes', () => {
  console.log('Listing the notes');
});

yargs.command('read', 'Read a note', () => {
  console.log('Reading the note');
});

yargs.parse();
