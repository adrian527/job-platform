import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardData } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardData();

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${showSidebar ? "show-sidebar" : ""} `}
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
