import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "../firebase"
import React from 'react'
import { navigate } from "@reach/router"
import * as routes from "../constants/routes"
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => createStyles({
  nav: {
    position: "absolute",
    top: 0,
    height: "7vh"
  },
}));

const pages = [
  {name: "Home", linkTo: routes.HOME},
  {name: "Profile", linkTo: routes.PROFILE},
  {name: "Admin", linkTo: routes.ADMIN},
  {name: "Reception", linkTo: routes.RECEPTION},
  {name: "Session", linkTo: routes.SESSION}
]

export default () => {
  const [user, initializing] = useAuthState(auth)
  const classes = useStyles();
  if(!user || initializing) return null
  const pagesLength = pages.length
  const gridFraction = 100 / pagesLength
  return(
    <nav className={classes.nav} style={{display: "grid", gridTemplateColumns: `repeat(${pagesLength}, ${gridFraction}%)`}}>
      {pages.map(page => <button key={page.name} onClick={() => navigate(page.linkTo)}>{page.name}</button>)}
    </nav>
  )
}
