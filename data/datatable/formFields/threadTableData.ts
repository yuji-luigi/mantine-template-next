export const threadTableData: Array<FormFieldInterface> = [
  {
    id: 'title',
    name: 'title',
    label: 'Title',
    placeholder: 'Have you ever seen...?',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'body',
    name: 'body',
    label: 'body',
    placeholder: 'Have you ever seen the cat with 6 colors?...',
    type: 'long-text',
    required: true,
    priority: 1,
  },
  {
    id: 'attachments',
    name: 'attachments',
    label: 'attachments',
    type: 'attachment',
    selectValues: ['name'],
    required: false,
    priority: 2,
  },
  {
    id: 'building',
    name: 'building',
    label: 'created by',
    type: 'select',
    multi: true,
    entitySingle: 'building',
    entityPlural: 'buildings',
    selectValues: ['name'],
    required: false,
    priority: 2,
  },
];
