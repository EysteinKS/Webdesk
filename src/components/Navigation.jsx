import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import React from "react";
import { navigate } from "@reach/router";
import * as routes from "../constants/routes";
import { useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    nav: {
      position: "absolute",
      top: 0,
      height: "7vh"
    }
  })
);

const pages = [
  { name: "Webdesk", linkTo: routes.HOME },
  { name: "Profile", linkTo: routes.PROFILE },
  { name: "Admin", linkTo: routes.ADMIN, roles: ["admin"] },
  { name: "Reception", linkTo: routes.RECEPTION },
  { name: "Session", linkTo: routes.SESSION }
];

export default function Navigation() {
  const [user, initializing] = useAuthState(auth);
  const classes = useStyles();
  const role = useSelector(state => state.auth.user.role);
  const userIsLoaded = useSelector(state => state.auth.isLoaded);

  const authorized = pages.filter(page => {
    if (Array.isArray(page.roles)) {
      console.log(`Checking if ${page.roles} contains ${role}`);
      console.log("page.roles.includes(role): ", page.roles.includes(role));
      return page.roles.includes(role);
    }
    return true;
  });

  const pagesLength = authorized.length;
  const gridFraction = 100 / pagesLength;

  if (!user || initializing || !userIsLoaded)
    return (
      <nav
        className={classes.nav}
        style={{
          width: "100vw",
          backgroundColor: "#333",
          height: "6vh",
          border: "solid 1px #555"
        }}
      />
    );
  return (
    <nav
      className={classes.nav}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${pagesLength}, ${gridFraction}%)`,
        width: "100vw",
        height: "6vh"
      }}
    >
      {authorized.map(page => (
        <button
          key={page.name}
          onClick={() => navigate(page.linkTo)}
          style={{ backgroundColor: "#333", borderColor: "#555" }}
        >
          <p style={{ color: "white" }}>{page.name}</p>
        </button>
      ))}
    </nav>
  );
}
