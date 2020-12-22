import styles from "./About.module.css";
const About = () => {
  return (
    <div className={`${styles.container} w-100 text-center`}>
      <h3 className={`${styles["about-header"]}`}>About Us</h3>
      <p className={styles["about-p"]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra
        imperdiet felis, nec mattis nisi tempus ac. Vestibulum eget sapien vel
        dolor gravida sollicitudin. Pellentesque finibus orci eu diam varius, ac
        dictum sem aliquam. Phasellus gravida, quam sed semper aliquam, risus
        justo vulputate nibh, id mattis leo ante sit amet ipsum. Fusce tempor
        sapien nec tincidunt egestas. Nullam mattis arcu id lorem maximus, eu
        rhoncus ligula porta. Phasellus euismod hendrerit velit.
      </p>
      <p className={styles["about-p"]}>&copy; 2020 PetAdopt, Inc.</p>
    </div>
  );
};

export default About;
