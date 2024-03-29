import ClassServer from "./server.js";
import {serverList} from '../data.js'

export default function Sidebar() {
    const classServers = []

    for(let i =0;i<3;i++){
        classServers.push(<classServer serverInfo={serverList[i]}/>)
    }

    return (
    <div class="sidebar">
       {/* <h1>4School</h1> */}
        <h6>Choose the Server you want to enter</h6>
            {/* {{classServers}} */}
        {serverList.map((serv,index) =>(
            <ClassServer key={index} serverInfo={serv}/>
        ))}

    </div>
  );
}
