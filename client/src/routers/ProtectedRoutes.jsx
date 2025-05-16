import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SetUser } from "../redux/usersSlice";
import { message } from "antd";
import { userService } from "../_services/user.service";
import { accountService } from "../_services/account.service";
import Layout from "../components/Layout";

const ProtectedRoutes = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await userService.getMyInfo();
      if (response.success) {
        //setUserData(response.data);
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (accountService.isLogged()) {
      //if (!userData) {
      if (!user) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  /**
   * Déconnexion automatique
   */

  return user && <Layout user={user}>{props.children}</Layout>;
};

export default ProtectedRoutes;
