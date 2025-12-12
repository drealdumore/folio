import { Metadata } from "next";
import { Heading } from "@/components/design/heading";
import ChatInterface from "./_components/chat-interface";

export const metadata: Metadata = {
  title: "Chat with Samuel",
  description: "Ask Samuel's AI clone anything about his work, skills, projects, and experience.",
};

const ChatPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chat with Samuel"
        sub="Ask me anything about my work, skills, or projects!"
      />
      
      <ChatInterface />
    </div>
  );
};

export default ChatPage;