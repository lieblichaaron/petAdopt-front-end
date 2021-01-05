import styles from "./Dashboard.module.css";
import { getAllUsers } from "../../lib/serverFuncs";
import { useEffect, useState } from "react";
import { ListGroup, Tab, Row, Col } from "react-bootstrap";
import DashboardUserListItem from "./DashboardUserListItem";
import DashboardUserInfo from "./DashboardUserInfo";
const Dashboard = () => {
  const [usersList, setUsersList] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsers();
      setUsersList(users);
    };
    getUsers();
  }, []);
  return (
    <div className={styles["page-container"]}>
      {usersList && (
        <Tab.Container defaultActiveKey={`#${usersList[0]._id}`}>
          <Row>
            <Col sm={4}>
              <ListGroup variant="flush">
                {usersList.map((user) => (
                  <DashboardUserListItem key={user._id} user={user} />
                ))}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {usersList.map((user) => (
                  <DashboardUserInfo key={user._id} user={user} />
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
};

export default Dashboard;
