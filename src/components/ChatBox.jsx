import { useState } from "react";

function ChatBox({ messages, onMessage, audioLoading }) {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const message = e.target.message.value;
    if (message) {
      e.target.message.value = "";
      await onMessage(message);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center h-full py-2">
      <div className="border-black border border-solid p-4 mb-2 w-[800px] grow overflow-y-scroll">
        {messages.map((elem) => (
          <p
            className={`"whitespace-pre-wrap" ${
              elem.is_user_message ? "text-white" : ""
            }`}
            key={elem.content}
          >
            <b>{elem.is_user_message ? "Human:" : "AI:"}</b> {elem.content}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex w-[800px] fixed bottom-12">
        <div className="flex grow items-center border-black border border-solid ">
          <div className="font-bold ml-4">Human:</div>
          <input
            className="p-1 my-2 mx-4 h-12 font-mono grow bg-stone-500 text-white outline-none"
            placeholder="Type your message here !"
            name="message"
          />
        </div>
        <input
          className="cursor-pointer bg-black text-white ml-2 p-2 px-5 font-mono font-bold"
          value={loading || audioLoading ? "Loading..." : "Send >"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default ChatBox;
