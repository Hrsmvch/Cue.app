import UserInfo from "components/UserInfo"
import PageTitle from "components/PageTitle" 
import DefaultHeader from "layouts/DefaultHeader"
import WidgetsContainer from "./components/WidgetsContainer"
// import styles from './widgets.module.scss'
// import Reminder from "./components/ReminderWidget"
// import EventsWidget from "./components/EventsWidget"
// import { useState } from "react"
// import TotalExpensesWidget from "./components/TotalExpensesWidget"
// import NotesWidget from "./components/NotesWidget"
// import FinanceAnalyticsYear from "./components/FinanceWidget"


const Home = () => {
  // const [activeWidget, setActiveWidget] = useState(null);

  // const handleOpenWidget = (data) => {
  //   if(data != activeWidget){
  //     setActiveWidget(data)
  //     return
  //   }
  //   setActiveWidget(null); 

  // }

  return (
   <>
    <DefaultHeader>
      <PageTitle title="Home" />
      <UserInfo />
    </DefaultHeader> 
    <WidgetsContainer>
      <h3>In progress..</h3>
      {/* <FinanceAnalyticsYear /> 
      <NotesWidget active={activeWidget} handleOpenWidget={handleOpenWidget}/>
      <div className={`${styles.widget} ${styles.overview_widget_3}`}></div>
      <EventsWidget active={activeWidget} handleOpenWidget={handleOpenWidget} /> 
      <Reminder/>  */}
    </WidgetsContainer>
   </>
  )
}

export default Home