"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  hasProPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasProPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>();
  const [reportIsLoading, setReportIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setReportIsLoading(true);
      const response = await generateAiReport({ month });
      setReport(response);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatório de IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório de IA</DialogTitle>
          <DialogDescription className="pt-4">
            {!hasProPlan
              ? "Apenas usuários PRO podem gerar relatórios"
              : "Use uma inteligência artificial para gerar um relatório com insights sobre suas finanças."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose-string:text-white prose max-h-[600px] text-white prose-h3:text-white prose-h4:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          {!hasProPlan ? (
            <Button asChild>
              <Link href="/subscription">Adquirir Plano</Link>
            </Button>
          ) : (
            <Button onClick={handleGenerateReport} disabled={reportIsLoading}>
              {reportIsLoading && <Loader2Icon className="animate-spin" />}
              Gerar Relatório
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
