import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface InsuranceSuccessProps {
  policyNumber: string;
  onClose: () => void;
}

export function InsuranceSuccess({
  policyNumber,
  onClose,
}: InsuranceSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <h2 className="text-[32px] font-bold">Antrag erfolgreich eingereicht!</h2>
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <p className="text-gray-600 mb-2">Deine Versicherungsscheinnummer:</p>
        <p className="text-2xl font-bold text-[#6B7BF7]">{policyNumber}</p>
      </div>
      <p className="text-gray-600">
        Vielen Dank für dein Vertrauen. Du erhältst in Kürze eine Bestätigung
        per E-Mail.
      </p>
      <Button onClick={onClose} className="mt-8 h-14 px-8">
        Zurück zum Start
      </Button>
    </motion.div>
  );
}
