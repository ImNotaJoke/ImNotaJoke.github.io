import type { ReactNode } from "react";
import "./InteractiveSkillCard.css";

interface InteractiveSkillCardProps {
  name: string;
  icon?: ReactNode;
  shortDesc: string;
  longDesc: string;
  isHardSkill?: boolean;
  onClick: () => void;
}

export default function InteractiveSkillCard({
  name,
  icon,
  shortDesc,
  onClick,
  isHardSkill = true,
}: InteractiveSkillCardProps) {
  return (
    <div
      className={`interactive-skill-card ${isHardSkill ? "hardskill" : "softskill"}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${name} - click for details`}
    >
      {/* Main content */}
      <div className="skill-card-main">
        {icon && <div className="skill-card-icon">{icon}</div>}
        <span className="skill-card-name">{name}</span>
      </div>

      {/* Hover tooltip (short description) */}
      <div className="skill-card-tooltip">{shortDesc}</div>

      {/* Click hint */}
      <div className="skill-card-hint">Click for details</div>

      {/* Decorative elements */}
      <div className="skill-card-border" />
    </div>
  );
}
