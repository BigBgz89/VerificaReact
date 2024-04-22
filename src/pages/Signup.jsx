import Header from "../components/Header";
import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";

function Signup() {
  return <Header title="Signup" icon={<DashboardIcon />} to="/" />;
}

export default Signup;
