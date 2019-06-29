import React, {useState} from "react"

export default function ActiveSession() {
  const [view, setView] = useState("overview")
  
  return(
    <main>
      <SessionContent view={view} setView={setView}/>
      <SessionFooter view={view} setView={e => setView(e)}/>
    </main>
  )
}

const ViewTitle = ({children}) => {
  return <h1 style={{margin: "0", height: "6vh", placeSelf: "center"}}>{children}</h1>
}

const SessionOverview = () => {
  return(
    <>
      <ViewTitle>Overview</ViewTitle>
      <section style={{
        maxHeight: "78vh",
        overflowY: "scroll",
        marginLeft: "20vw",
        marginRight: "20vw",
        display: "grid",
        gridTemplateColumns: "1fr"
      }}>
        <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)"}}>
            <p>Progress</p>
            <div style={{gridColumn: "2/6", backgroundColor: "white"}}/>
        </div>
        <p>Time Started: </p>
      </section>
    </>
  )
}

const SessionExercise = () => {
  return(
    <ViewTitle>Exercise</ViewTitle>
  )
}

const SessionQueue = () => {
  return(
    <ViewTitle>Queue</ViewTitle>
  )
}

const views = [
  {name: "overview", component: SessionOverview},
  {name: "exercise", component: SessionExercise},
  {name: "queue", component: SessionQueue}
]

const SessionContent = ({ view, setView }) => {
  let CurrentView = views.find(v => v.name === view)
  console.log("CurrentView: ", CurrentView)

  if(CurrentView){
    return(
      <section style={{
        display: "grid",
        gridTemplateRows: "10vh 78vh",
        height: "88vh"
      }}>
        <CurrentView.component/>
      </section>
    )
  } else {
    return(
      <section>
        <p>Unable to render {view}!</p>
      </section>
    )
  }
}

const SessionFooter = ({ view, setView }) => {
  return(
    <footer style={{
      width: "100vw",
      backgroundColor: "#333333",
      height: "6vh",
      borderTop: "2px solid #555555",
    }}>
      {views.map(v => <FooterLink key={"session_footer_link_" + v.name} thisView={v.name} currentView={view} setView={setView}/>)}
    </footer>
  )
}

const FooterLink = ({ thisView, currentView, setView }) => {
  let linkStyle = {width: "20vw", height: "6vh"}
  if(thisView.name === currentView){
    linkStyle = {...linkStyle, backgroundColor: "#FFFFFF"}
  }

  return(
    <button onClick={() => setView(thisView)} style={linkStyle}>
      <p style={{margin: "0"}}>{thisView}</p>
    </button>
  )
}