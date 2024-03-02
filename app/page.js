// import Image from "next/image";
import styles from "./page.module.css";
// import { Server } from "socket.io";
import ClassServer from "./components/server.js";
import {serverList} from './data.js'

export default function Home() {
    const classServers = []

    for(let i =0;i<3;i++){
        classServers.push(<classServer serverInfo={serverList[i]}/>)
    }

    return (
    <main className={styles.main}>
       <h1>4School</h1>
            {/* {{classServers}} */}
        {serverList.map((serv,index) =>(
            <ClassServer serverInfo={serv}/>
        ))}

    </main>
  );
}
