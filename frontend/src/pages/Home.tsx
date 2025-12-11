import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import DataTable from "../components/Datatable";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Paper,
  Divider,
  Fade,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import TableChartIcon from "@mui/icons-material/TableChart";

const Home: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchData = async (pageNum: number = 1) => {
    const response = await axios.get(`http://localhost:5000/api/data?page=${pageNum}&limit=10`);
    setData(response.data.data);
    setPage(response.data.page);
    setPages(response.data.pages);
  };

  const handleSearch = async (query: string) => {
    if (!query) {
      fetchData(1);
      return;
    }
    const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    setData(response.data);
    setPages(1);
    setPage(1);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      {/* Hero Banner */}
      <Paper
        elevation={8}
        sx={{
          p: 6,
          mb: 5,
          textAlign: "center",
          background: "linear-gradient(135deg, #ff4081 0%, #7c4dff 50%, #448aff 100%)",
          color: "white",
          borderRadius: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          CSV Data Hub
        </Typography>
        <Typography variant="h6">
          Upload, search, and explore your data in style
        </Typography>
      </Paper>

      {/* Upload Section */}
      <Card elevation={6} sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <CloudUploadIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Upload Your CSV
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <FileUpload onUploadSuccess={() => fetchData(page)} />
        </CardContent>
      </Card>

      {/* Search Section */}
      <Card elevation={6} sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <SearchIcon color="secondary" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Search Records
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <SearchBar onSearch={handleSearch} />
        </CardContent>
      </Card>

      {/* Data Table Section */}
      {data.length > 0 ? (
        <Fade in={true}>
          <Card elevation={6}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TableChartIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                  Uploaded Records
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <DataTable data={data} page={page} pages={pages} onPageChange={fetchData} />
            </CardContent>
          </Card>
        </Fade>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          No data yet — upload a CSV to get started!
        </Typography>
      )}
    </Container>
  );
};

export default Home;
