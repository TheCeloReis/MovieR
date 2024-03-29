import React, { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import BaseAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import SearchList from "../searchList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    flexGrow: 1,
    borderRadius: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    background: theme.palette.grey[900],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  lastButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: theme.palette.grey[900],
  },
}));

function AppBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const classes = useStyles();

  const location = useLocation();

  const closeSearchHandler = useCallback(() => {
    setSearchOpen(false);
    setSearchValue("");
  }, []);

  useEffect(() => {
    closeSearchHandler();
  }, [location.pathname, closeSearchHandler]);

  return (
    <Toolbar className={classes.root}>
      <BaseAppBar position="fixed">
        <Toolbar>
          {searchOpen ? (
            <InputBase
              autoFocus
              className={classes.searchInput}
              id="outlined-basic"
              placeholder="Search a movie"
              value={searchValue}
              onChange={({ target: { value } }) => setSearchValue(value)}
            />
          ) : (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              <RouterLink className={classes.title} to="/">
                <Typography variant="h6">MovieR</Typography>
              </RouterLink>
            </>
          )}

          {searchOpen ? (
            <IconButton
              edge="end"
              className={classes.lastButton}
              color="inherit"
              aria-label="close search"
              onClick={closeSearchHandler}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              className={classes.lastButton}
              color="inherit"
              aria-label="search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </IconButton>
          )}
        </Toolbar>
        <SearchList open={searchOpen} searchString={searchValue} />
      </BaseAppBar>
    </Toolbar>
  );
}

export default AppBar;
