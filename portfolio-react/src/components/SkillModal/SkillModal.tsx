import { useEffect } from "react";
import type { ReactNode } from "react";
import "./SkillModal.css";

interface SkillModalProps {
  isOpen: boolean;
  skillName: string;
  shortDesc: string;
  longDesc: string;
  icon?: ReactNode;
  onClose: () => void;
}

export default function SkillModal({
  isOpen,
  skillName,
  shortDesc,
  longDesc,
  icon,
  onClose,
}: SkillModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="skill-modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="skill-modal">
        <div className="skill-modal-header">
          <h2>{skillName}</h2>
          <button
            className="skill-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="skill-modal-content">
          {icon && <div className="skill-modal-icon">{icon}</div>}

          <div className="skill-modal-text">
            <h3>Overview</h3>
            <p className="skill-short">{shortDesc}</p>

            <h3 style={{ marginTop: "1.5rem" }}>Details</h3>
            <p className="skill-long">{longDesc}</p>
          </div>
        </div>

        <div className="skill-modal-footer">
          <p className="hint">Press ESC or click outside to close</p>
        </div>
      </div>
    </>
  );
}
