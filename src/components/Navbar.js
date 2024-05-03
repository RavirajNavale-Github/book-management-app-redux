import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  // Card,
  // CardContent,
  // Grid,
  // Checkbox,
  // FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setSortOption } from "../redux/authSlice"; // Import setSortOption action

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [sortAnchorEl, setSortAnchorEl] = useState(null); // State for sort dropdown

  //-------------------------------------------------------------------------

  // const [filters, setFilters] = useState({
  //   science_fiction: false,
  //   novel: false,
  //   thriller: false,
  //   motivational: false,
  //   // Add more categories as needed
  // });

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: checked,
  //   }));
  // };

  //------------------------------------------------------------------------------

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortOption = (option) => {
    dispatch(setSortOption(option)); // Dispatch setSortOption action with the selected option
    handleSortMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        marginBottom: 3,
        bgcolor: "#f59f1a",
        color: "#431605",
        p: "10px",
        boxShadow: "10",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                ml: { lg: "-500px", md: "-200px" },
                fontWeight: "600",
                fontFamily: "Poppins",
                fontSize:{md:"22px",xs:"18px"}
              }}
            >
              Word World Librabry
            </Typography>
          </Link>
        </Box>

        {/* Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "3vw" }}>
          <Link
            to="/addbook"
            style={{ textDecoration: "none", color: "inherit", marginRight: 2 }}
          >
            <Button
              variant="button"
              sx={{
                fontWeight: "600",
                fontSize:{md:"20px", xs:"15px"},
                fontFamily: "Poppins",
                ml:{xs:"20px"}
              }}
            >
              Add
            </Button>
          </Link>
          {/* Sort dropdown */}

          {/* ---------------------------------------------------------------------------------------------------------- */}
          {/* <Button onClick={handleSortMenuOpen} variant="outline" sx={{fontWeight:'600'}}>
          <Box mb={2} sx={{fontSize:'10px'}}>
      <Typography variant="p" component="h2" gutterBottom>
                  Filter by Category
                </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.novel}
              onChange={handleCheckboxChange}
              name="novel"
              sx={{fontSize:'5px'}}
            />
          }
          label="Novel"
          sx={{fontSize:'5px'}}
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
          </Button> */}

          {/* ---------------------------------------------------------------------------------------------------------- */}

          <Button
            onClick={handleSortMenuOpen}
            variant="outline"
            sx={{ fontWeight: "600", fontFamily: "Poppins", fontSize:{md:"20px", xs:"15px"}, }}
          >
            Sort by Release Year
          </Button>
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortMenuClose}
          >
            <MenuItem onClick={() => handleSortOption("asc")}>Asc</MenuItem>
            <MenuItem onClick={() => handleSortOption("desc")}>Desc</MenuItem>
          </Menu>
          {/* Authentication buttons */}
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              sx={{
                color: "#df6b0c",
                bgcolor: "#fadb8d",
                fontWeight: "600",
                fontFamily: "Poppins",
                border: "none",
                outline: "none",
                fontSize:{md:"15px", xs:"12px"},
              }}
              variant="contained"
            >
              Logout
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button
                sx={{
                  color: "#df6b0c",
                  bgcolor: "#fadb8d",
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  border: "none",
                  outline: "none",
                }}
                variant="outlined"
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
