import { useViewportCheck } from "hooks/useViewportCheck";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Menu = () => {
  const isMobile = useViewportCheck('mobile'); 
  return isMobile ? <MobileMenu /> : <DesktopMenu /> 
}

export default Menu