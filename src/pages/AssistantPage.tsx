import ChatInterface from "@/components/ChatInterface";
import { MessageSquare } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="space-y-4 h-full">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Assistant RH Intelligent
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Posez vos questions sur le planning, les absences, la charge et la conformité</p>
      </div>
      <ChatInterface />
    </div>
  );
}
