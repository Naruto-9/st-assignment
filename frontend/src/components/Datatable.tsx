import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Box, Typography
} from "@mui/material";

interface Props {
  data: { [key: string]: string }[];
  page: number;
  pages: number;
  onPageChange: (newPage: number) => void;
}

const DataTable: React.FC<Props> = ({ data, page, pages, onPageChange }) => {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0] || {}).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                {Object.values(row).map((val, i) => (
                  <TableCell key={i}>{val}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
        <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Prev</Button>
        <Typography sx={{ mx: 2 }}>{page} / {pages}</Typography>
        <Button disabled={page === pages} onClick={() => onPageChange(page + 1)}>Next</Button>
      </Box>
    </Box>
  );
};

export default DataTable;
