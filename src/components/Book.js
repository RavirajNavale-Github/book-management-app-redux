import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector to read from Redux state
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Book = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    science_fiction: false,
    novel: false,
    thriller: false,
    motivational: false,
    // Add more categories as needed
  });

  const sortOption = useSelector((state) => state.auth.sortOption); // Read sorting option from Redux state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://todo-server-9bjp.onrender.com/books"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const filteredBooks = data.filter((book) => {
    if (
      !filters.novel &&
      !filters.science_fiction &&
      !filters.thriller &&
      !filters.motivational
    ) {
      // If no filters are selected, return true for all books
      return true;
    }
    if (filters.novel && book.category === "Novel") {
      return true;
    }
    if (filters.science_fiction && book.category === "Science_Fiction") {
      return true;
    }
    if (filters.thriller && book.category === "Thriller") {
      return true;
    }
    if (filters.motivational && book.category === "Motivational") {
      return true;
    }
    // Add more conditions for other categories
    return false;
  });

  // Sort the books based on the selected option
  const sortedBooks = [...filteredBooks]; // Create a copy of filteredBooks array
  if (sortOption === "asc") {
    sortedBooks.sort((a, b) => a.release_year - b.release_year);
  } else if (sortOption === "desc") {
    sortedBooks.sort((a, b) => b.release_year - a.release_year);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  return (
    <Box p={3} 
    sx={{ 
      mt: "-30px", 
      bgcolor: "#fadb8d", 
      height: {lg:"200vh", md:"200vh", xs:"300vh"} }}>
      <Box mb={2}>
        <Typography variant="h5" component="h2" gutterBottom>
                  Filter by Category
                </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.novel}
              onChange={handleCheckboxChange}
              name="novel"
            />
          }
          label="Novel"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.science_fiction}
              onChange={handleCheckboxChange}
              name="science_fiction"
            />
          }
          label="Science_Fiction"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.thriller}
              onChange={handleCheckboxChange}
              name="thriller"
            />
          }
          label="Thriller"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.motivational}
              onChange={handleCheckboxChange}
              name="motivational"
            />
          }
          label="Motivational"
        />
      </Box>
      <Grid container spacing={3} sx={{ mt: "20px" }}>
        {sortedBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#f8c351",
                borderRadius: "20px",
                color: "#431605",
                boxShadow: "5",
              }}
            >
              <CardContent sx={{ flexGrow: 1, color: "#431605" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "600", fontFamily: "Poppins" }}
                >
                  {book.book_name}
                </Typography>
                <Typography gutterBottom sx={{ fontFamily: "Poppins" }}>
                  Author: {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  gutterBottom
                  sx={{ fontFamily: "Poppins" }}
                >
                  Published Year: {book.release_year}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  gutterBottom
                  sx={{ fontFamily: "Poppins" }}
                >
                  Category: {book.category}
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="center" pb={2}>
                <Link to={`/books/${book.id}`}>
                  <Button
                    style={{ width: "100%" }}
                    sx={{
                      bgcolor: "#ef8911",
                      color: "#fff",
                      fontFamily: "Poppins",
                      p: "5px 15px",
                    }}
                  >
                    Show
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Book;
