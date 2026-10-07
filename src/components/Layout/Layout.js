import { Fragment } from "react";
import { useSelector } from "react-redux";

import MainHeader from "./MainHeader";
import Notification from "../UI/Notification";

const Layout = (props) => {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <Fragment>
      {notification && <Notification {...notification} />}
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
