export default function Messages({mes}) {
    
    return (
        <ul>
            <li class="message">
                <p class="mesName">mes.user</p>
                <p class="mesTime">mes.user</p>
                <p class ="mesText">mes.message</p>

            </li>
            <ul>
            {messages.map((message) => (
              <li key={message.id} className={message.uid === uid ? "sent" : "received"}>
                <section>
                  {/* Display the UID with the message */}
                  <p>{message.uid}</p>
                  <p>{message.text}</p>
                  {/* Message date and time */}
                  {message.createdAt?.seconds && (
                    <span>
                      {formatRelative(new Date(message.createdAt.seconds * 1000), new Date())}
                    </span>
                  )}
                </section>
              </li>
            ))}
          </ul>        
        </ul>
  );
}