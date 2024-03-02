// import Image from "next/image";
import styles from "./page.module.css";
// import { Server } from "socket.io";
import ClassServer from "./components/server.js";
import {serverList} from './data.js'

export default function Home() {
  return (
    <main className={styles.main}>
       <h1>4School</h1>
        
        <ClassServer serverInfo={serverList[0]}/>
    </main>
  );
}
