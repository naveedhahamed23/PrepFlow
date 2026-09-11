import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function EndInterviewModal({ open, onClose, onConfirm, remainingQuestions }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="End Interview?"
      size="sm"
    >
      <div className="py-4">
        <p className="text-text mb-4">
          Are you sure you want to end the interview early?
        </p>
        {remainingQuestions > 0 && (
          <p className="text-sm text-warning bg-warning/10 p-3 rounded-lg border border-warning/20">
            You still have {remainingQuestions} question{remainingQuestions !== 1 ? 's' : ''} remaining in this session.
          </p>
        )}
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={onClose}>
          Continue Interview
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          End Interview
        </Button>
      </div>
    </Modal>
  );
}
