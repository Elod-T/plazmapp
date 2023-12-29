import { useContext, useEffect, useState } from "react";
import BasePage from "../components/BasePage";
import { PlazmAPPContext } from "../App";
import { Message } from "../types";

const Messages = () => {
  const context = useContext(PlazmAPPContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const cachedMessages = localStorage.getItem("myMessages");

      if (cachedMessages) {
        const { messages, createdAt } = JSON.parse(cachedMessages) as {
          messages: Message[];
          createdAt: number;
        };

        if (new Date().getTime() - createdAt < 1000 * 60 * 60 * 24) {
          setMessages(messages);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      const messages = await plazmAPP.getMyMessages();

      const data = {
        messages,
        createdAt: new Date().getTime(),
      };

      localStorage.setItem("myMessages", JSON.stringify(data));

      setMessages(messages);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  if (!context) {
    return null;
  }

  const plazmAPP = context.plazmAPP;

  return (
    <BasePage>
      <h1 className="mt-32 text-3xl font-bold">Üzeneteim</h1>

      <div className="flex flex-col gap-5 mt-10">
        {loading && <p>Töltés...</p>}
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">
              {new Date(message.created_at).toLocaleDateString("hu")}
            </p>
            <strong className="text-xl">{message.title}</strong>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </BasePage>
  );
};

export default Messages;
