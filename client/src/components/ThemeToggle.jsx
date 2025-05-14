import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardData } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardData();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>
  );
};

export default ThemeToggle;
