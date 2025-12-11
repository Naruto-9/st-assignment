import React from "react";
import { TextField } from "@mui/material";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;
