import { ActionIcon, Group } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCrudSlice } from '../../../../hooks/redux-hooks/useCrudSlice';
import { TableCellDecorator } from '../TableCellDecorator';
import { useDrawerContext } from '../../../context/DataTableDrawerContext';

export function TableRow({
  rowData,
  sectionFormFields,
}: {
  rowData: AllModels;
  sectionFormFields: Array<FormFieldInterface>;
}) {
  /** use hook context */
  const { openDrawer } = useDrawerContext();
  /** use hook router hook */
  const { query } = useRouter();
  /** use hook useCrudSlice */
  const { selectCrudDocument } = useCrudSlice();

  /** get runtime value of the entity */
  const entity = query.entity as Sections;
  // const selectedDocument = getSelectedDocument(entity);
  const { deleteCrudDocument } = useCrudSlice();
  const onModify = (): void => {
    selectCrudDocument({ entity, document: rowData });
    openDrawer();
  };
  const onDelete = (): void => {
    deleteCrudDocument({ entity, documentId: rowData._id });
  };
  useEffect(
    () => () => {
      selectCrudDocument({ entity, document: null });
    },
    []
  );
  return (
    <tr key={rowData._id}>
      {/*
          Regular cells defined here
      */}
      {sectionFormFields.map((cellConfig) => (
        <TableCellDecorator key={cellConfig.id} cellConfig={cellConfig} rowData={rowData} />
      ))}
      {/*
          Action cells defined here(modify, delete button)
      */}
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={onModify}>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={onDelete}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
}
