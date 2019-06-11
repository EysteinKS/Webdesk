import {createSelector, createStructuredSelector } from "reselect"

const auth = state => state.auth
const user = state => state.auth.user