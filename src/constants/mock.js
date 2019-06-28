const currentLanguage = "nb-NO"

const getDate = (dateObject, locale) => {
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }
  return dateObject.toLocaleDateString(locale, options)
}

const getTime = (dateObject, locale) => dateObject.toLocaleTimeString(locale)

const timeStarted = new Date("2019-06-28T17:00:00")
const timeEnded = new Date("2019-06-28T19:00:00")

export const locations = [
  {id: "U1", name: "Home"},
  {id: "U2", name: "Outdoor"},
  {id: "G1", name: "Imperia Gym"}
]

export const exercises = [

]

export const currentUserData = {
  sessionHistory: [
    {
      id: 1,
      user: "UID",
      date: getDate(timeStarted, currentLanguage),
      started: getTime(timeStarted, currentLanguage),
      ended: getTime(timeEnded, currentLanguage),
      location: {
        name: "Imperia Gym",
        id: "G1"
      },
      steps: [
        {
          timeStarted: "",
          timeEnded: "",
          exerciseID: "",
          weight: "",
          reps: "",
          sets: "",
          satisfaction: "",
          comment: ""
        }
      ]
    }
  ]
}

export const sessions = [
  
]