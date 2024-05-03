import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBook } from "../redux/bookSlice";
import Loader from "./Loader";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://todo-server-9bjp.onrender.com/books/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();

    return () => {
      // Cleanup code if needed
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleChangeChapterName = (index, value) => {
    const updatedChapters = [...book.chapters];
    updatedChapters[index].name = value;
    setBook((prevBook) => ({
      ...prevBook,
      chapters: updatedChapters,
    }));
  };

  const handleChangeChapterPages = (index, value) => {
    const updatedChapters = [...book.chapters];
    updatedChapters[index].pages = value;
    setBook((prevBook) => ({
      ...prevBook,
      chapters: updatedChapters,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making the PUT request to update the book data
      await axios.put(
        `https://todo-server-9bjp.onrender.com/books/${id}`,
        book
      );

      // Dispatching the updateBook action with the updated book data
      dispatch(updateBook(id, book));

      // Navigate to the homepage after updating the book
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  if (!book) return <Loader />;

  return (
    <Box
    sx={{
      bgcolor:'#fadb8d', mt:'-25px', height:'100vh', pt:'20px'}}>
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <Typography variant="h4">Edit</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Input
            name="book_name"
            placeholder="Book Name"
            fullWidth
            value={book.book_name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            name="author"
            placeholder="Author"
            fullWidth
            value={book.author}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            name="release_year"
            placeholder="Release Year"
            fullWidth
            value={book.release_year}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            name="category"
            placeholder="Category"
            fullWidth
            value={book.category}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          {book.chapters.map((chapter, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Input
                name={`chapterName${index}`}
                placeholder={`Chapter ${index + 1} Name`}
                fullWidth
                value={chapter.name}
                onChange={(e) => handleChangeChapterName(index, e.target.value)}
              />
              <Input
                name={`chapterPages${index}`}
                placeholder={`Chapter ${index + 1} Pages`}
                fullWidth
                value={chapter.pages}
                onChange={(e) =>
                  handleChangeChapterPages(index, e.target.value)
                }
                sx={{ mt: 2 }}
              />
            </Box>
          ))}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{bgcolor: "#df6b0c", color: "#fadb8d", mt:'20px'}}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditBook;
