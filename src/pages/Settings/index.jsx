import UserInfo from "components/UserInfo"
import PageTitle from "components/PageTitle"
import LogOut from "./LogOut"
import NotificationSettings from "features/notificationsSettings/"
import Profile from "features/profile"
import DefaultHeader from "layouts/DefaultHeader"
import DefaultContent from "layouts/DefaultContent"

const Setting = () => {
  return (
    <>
      <DefaultHeader >
        <PageTitle title="Settings" />
        <UserInfo />
      </DefaultHeader>
      <DefaultContent>
        <Profile />
        <NotificationSettings />
        <LogOut />
      </DefaultContent>
    </>
  )
}

export default Setting