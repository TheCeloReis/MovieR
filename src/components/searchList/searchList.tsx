import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import debounce from "@material-ui/core/utils/debounce";
import List from "@material-ui/core/List";

import imdbAPI from "../../api";
import { BasicInfoResult } from "../../api/types";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link as RouterLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "0",
    transform: "translateY(100%)",
    width: "100%",
  },
  avatar: {
    backgroundColor: theme.palette.grey[500],
    borderRadius: theme.spacing(1),
  },
  text: {
    color: theme.palette.primary.main,
  },
}));

const debounceSearch = debounce(
  async (
    search: string,
    setState: (result: BasicInfoResult[] | null) => void
  ) => {
    const res = await imdbAPI.search(search);

    setState(res);
  },
  1000
);

type PropsType = {
  open: boolean;
  searchString: string;
};

function SearchList(props: PropsType) {
  const [results, setResults] = useState<BasicInfoResult[] | null>([]);

  const classes = useStyles();

  useEffect(() => {
    debounceSearch(props.searchString, setResults);
  }, [props.searchString]);

  useEffect(() => {
    debounceSearch.clear();
  }, []);

  return props.open ? (
    <Paper className={classes.root} elevation={0}>
      <List>
        {results?.map((movie, index) => (
          <React.Fragment key={movie.id}>
            <ListItem
              color="primary"
              component={RouterLink}
              to={`movie/${encodeURI(movie.id)}`}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar} alt="" src={movie.image} />
              </ListItemAvatar>
              <ListItemText className={classes.text} primary={movie.title} />
            </ListItem>
            {index === results.length - 1 ? null : (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  ) : null;
}

export default SearchList;
