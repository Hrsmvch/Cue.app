import UserInfo from "components/UserInfo";
import PageTitle from "components/PageTitle"; 
import DefaultHeader from "layouts/DefaultHeader"
import Events from "features/events";

const Calendar = () => {
  return (
    <>
      <DefaultHeader >
        <PageTitle title="Calendar" />
        <UserInfo />
      </DefaultHeader>   
      <Events /> 
    </>
  )
}

export default Calendar