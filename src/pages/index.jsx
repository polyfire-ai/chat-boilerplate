// src/App.jsx
import React, { useEffect, useState } from "react";
import { PolyfireProvider, usePolyfire } from "polyfire-js/hooks";
import ChatBox from "../components/ChatBox";

// This is the main entry point for your application.
// It initializes the PolyfireProvider, which is essential to provide the necessary context for Polyfire functionalities.
const App = () => (
  <PolyfireProvider project="simulaworld_47">
    <ExampleComponent />
  </PolyfireProvider>
);

// NOTE: This is a basic example for demonstration purposes. In a real-world application,
// you would replace this with your own components and logic.
const ExampleComponent = () => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access Polyfire functionalities using the usePolyfire hook.
  const {
    auth: { login, logout, status },
    models: { generate, tts },
    utils: { Chat },
  } = usePolyfire();

  useEffect(() => {
    if (status == "authenticated") {
      const systemPrompt = `You are a game engine. The user sends you some actions and then you answer with some events. 
      Always answer witht something specific and new than happens to the user. 
      Make horrible things happen to the user, but keep it fun.`;
      const chat = new Chat({ systemPrompt, model: "wizard-mega-13b-awq" });
      setChat(chat);
    }
  }, [status]);

  return (
    <div className="text-2xl font-bold p-2 text-red-500">
      {status !== "authenticated" && status !== "loading" ? (
        <>
          <button onClick={() => login("github")}>Login with Github</button>
        </>
      ) : (
        <>
          <>
            {chat ? (
              <ChatBox
                messages={messages}
                onMessage={async (message) => {
                  const answer = await chat.sendMessage(message);
                  console.log({ answer });
                  try {
                    setLoading(true);
                    //const audio = await tts(answer);
                    setLoading(false);
                    //await audio.play();
                  } catch (err) {
                    console.log(err);
                  }
                  setMessages((await chat.getMessages()).reverse());
                }}
                audioLoading={loading}
              />
            ) : (
              "Loading..."
            )}
          </>
          <br />
          {/* <button onClick={logout}>Logout</button> */}
          <br />
          <br />
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  completion: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
};

export default App;
