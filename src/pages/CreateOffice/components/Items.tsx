/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { ITEMS, Data as ItemData } from "../gql/itemsQuery";
import { OFFICE, Data as OfficeData } from "../gql/officeServicesQuery";
import ItemsProps from "./ItemsProps";
import { useEffect, useState } from "react";
import Selector from "./Selector";
import { CREATE_OFFICE_ITEM } from "../gql/createOfficeItemMutation";
import { UPDATE_OFFICE_ITEM } from "../gql/updateOfficeItemMutation";
import { DELETE_OFFICE_ITEM } from "../gql/deleteOfficeItemMutation";

function Items(props: ItemsProps) {
  const { error, data: itemData } = useQuery<ItemData>(ITEMS);
  const { error: officeError, data: officeData, refetch: refetchOfficeData } = useQuery<OfficeData>(OFFICE, { variables: { id: props.officeId } });
  const [pieces, setPieces] = useState<Array<number>>();
  const [createOfficeItem] = useMutation(CREATE_OFFICE_ITEM);
  const [updateOfficeItem] = useMutation(UPDATE_OFFICE_ITEM);
  const [deleteOfficeItem] = useMutation(DELETE_OFFICE_ITEM);

  useEffect(() => {
    console.log(officeData);
    const p = officeData?.office.items.map((item) => item.pieces);
    setPieces(p);
  }, [officeData]);

  const createItem = async (item: number, pieces: number) => {
    await createOfficeItem({ variables: { item, pieces, office: officeData?.office.id } });
    refetchOfficeData();
  };

  const updateItem = async (id: number, pieces: number) => {
    await updateOfficeItem({ variables: { id, pieces } });
    refetchOfficeData();
  };

  const deleteItem = async (id: number) => {
    await deleteOfficeItem({ variables: { id } });
    refetchOfficeData();
  };

  return (
    <>
      <Typography
        variant="h5"
        css={css`
          margin-top: 15px;
        `}
      >
        Items
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Pieces</TableCell>
              <TableCell sx={{ width: "200px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <DataTable itemData={itemData} officeData={officeData} pieces={pieces} createItem={createItem} updateItem={updateItem} deleteItem={deleteItem} />
            {renderError(error)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

interface DataTableProps {
  itemData?: ItemData;
  officeData?: OfficeData;
  pieces?: number[];
  createItem: (item: number, pieces: number) => Promise<void>;
  updateItem: (id: number, pieces: number) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

function DataTable(props: DataTableProps) {
  if (props.itemData && props.officeData) {
    return (
      <>
        {props.itemData.items.map((item) => {
          const { id, pieces } = findOfficeItem(item.id, props.officeData as OfficeData) || {};
          return (
            <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>#{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <Selector
                pieces={pieces}
                onCreate={(pieces: number) => props.createItem(item.id, pieces)}
                onUpdate={(pieces: number) => props.updateItem(id as number, pieces)}
                onDelete={() => props.deleteItem(id as number)}
              />
            </TableRow>
          );
        })}
      </>
    );
  }

  return null;
}

function renderError(error: ApolloError | undefined) {
  if (error) {
    return (
      <Typography variant="body1" color="red">
        {error.message}
      </Typography>
    );
  }
}

function findOfficeItem(itemId: number, officeData: OfficeData) {
  for (const data of officeData.office.items) {
    if (data.item.id === itemId) {
      return { pieces: data.pieces, id: data.id };
    }
  }
}

export default Items;
