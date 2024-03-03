import styles from "../page.module.css";
import ClassServer from "../components/server.js";
import Navbar from "../components/navbar.js";
import Sidebar from "../components/sidebar.js";
import Test from "../components/P2.js";
import {serverList} from '../data.js'

export default function French() {
    const classServers = []

    for(let i =0;i<3;i++){
        classServers.push(<classServer serverInfo={serverList[i]}/>)
    }

    return (
    <main className={styles.main}>
        <Navbar />
        <Sidebar />
        <Test />
   </main>
  );
}
