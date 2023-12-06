import { Navigate, Route, Routes } from "react-router-dom"
import PageContainer from "./components/PageContainer"
import Faq from "pages/FaqPlatform"
import Home from "pages/Home"
import routes from 'data/routes';
import Finance from "pages/Finance";
import Calendar from "pages/Calendar";
import Notes from "pages/Notes";
import Setting from "pages/Settings";

const AuthenticatedLayout = () => {
  return (
    <Routes>
      <Route element={<PageContainer />}>
        <Route path={routes.home} element={<Home />} /> 
        <Route path={routes.finance} element={<Finance />} /> 
        <Route path={routes.calendar} element={<Calendar />} />
        <Route path={routes.notes} element={<Notes />} />
        <Route path={routes.faq} element={<Faq />} /> 
        <Route path={routes.settings} element={<Setting />} /> 
      </Route>
      <Route path="*" element={<Navigate replace to={routes.home} />} />
    </Routes>
  )
}

export default AuthenticatedLayout