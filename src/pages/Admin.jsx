import React, { useEffect } from 'react'
import { navigate, Router, Link } from "@reach/router"
import { useSelector } from "react-redux"

export default () => {
  const role = useSelector(state => state.auth.user.role)
  const isLoaded = useSelector(state => state.auth.isLoaded)

  useEffect(() => {
    if(role !== "admin" && isLoaded){
      navigate("/")
    }
  }, [role, isLoaded])

  if(role !== "admin") return null
  return (
    <div>
      <h3>Admin</h3>
      {pages.map((page, index) => 
        <button><Link to={page.path}>{pageComponents[index]}</Link></button>
      )}
      <AdminPages/>      
    </div>
  )
}

const pages = [
  { name: "ReceptionAdmin", Component: <p>Reception</p>, path: "reception" },
  { name: "UsersAdmin", Component: <p>Users</p>, path: "users" },
  { name: "SiteAdmin", Component: <p>Site</p>, path: "site" },
  { name: "ContentAdmin", Component: <p>Content</p>, path: "content" }
]

const pageComponents = [
  "Reception",
  "Users",
  "Site",
  "Content"
]

const AdminPages = () => {
  let mappedPages = pages.map((page, index) => {
    let pageContent = pageComponents[index]
    return(
    <div key={page.name} path={page.path}>
      {pageContent}
    </div>)
  })
  return(
    <>
      {mappedPages}
    </>
  )
}
