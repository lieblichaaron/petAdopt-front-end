import styles from "./Dashboard.module.scss";
import { getAllUsers } from "../../lib/serverFuncs";
import { useEffect, useState } from "react";
import { ListGroup, Tab, Row, Col } from "react-bootstrap";
import DashboardUserListItem from "./DashboardUserListItem";
import DashboardUserInfo from "./DashboardUserInfo";
const Dashboard = () => {
  const [usersList, setUsersList] = useState("");
  const [tempUsersList, setTempUsersList] = useState("");
  const getUsers = async () => {
    const users = await getAllUsers();
    setUsersList(users);
    setTempUsersList(users);
  };
  const handleInput = (e) => {
    const newUsersList = usersList.filter((user) => {
      return user.fullName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setTempUsersList(newUsersList);
    console.log("now");
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={styles["page-container"]}>
      <div className={styles["search-bar"]}>
        <div className={styles["search-label"]}>Search for user:</div>
        <input
          type="text"
          className={styles["name-input"]}
          placeholder="Name"
          onChange={handleInput}
        />
      </div>
      {tempUsersList.length > 0 && (
        <Tab.Container defaultActiveKey={`#${tempUsersList[0]._id}`}>
          <Row>
            <Col sm={4}>
              <ListGroup variant="flush">
                {tempUsersList.map((user) => (
                  <DashboardUserListItem key={user._id} user={user} />
                ))}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {tempUsersList.map((user) => (
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
