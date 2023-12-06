import { Routes, Route, Navigate } from 'react-router-dom';
import routes from 'data/routes';
import PageContainer from './components/PageContainer'; 
import Faq from 'pages/Faq';
import Welcome from 'pages/Welcome';

const UnauthenticatedLayout = () => {
  return (
    <Routes>
      <Route element={<PageContainer />}>
        <Route path={routes.home} element={<Welcome />} /> 
        <Route path={routes.faq} element={<Faq />} /> 

      </Route>
      <Route path="*" element={<Navigate replace to={routes.home} />} />
    </Routes>
  )
}

export default UnauthenticatedLayout 