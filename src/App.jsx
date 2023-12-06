import { useSelector } from "react-redux";
import AuthenticatedLayout from "layouts/AuthenticatedLayout";
import UnAuthenticatedLayout from "layouts/UnauthenticatedLayout"; 

function App() {
  const { userToken } = useSelector((state) => state?.user);
  return <>{userToken ? <AuthenticatedLayout /> : <UnAuthenticatedLayout />}</>;
}

export default App;
