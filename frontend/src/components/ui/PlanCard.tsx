import type { Plan } from "../../types/plan";
import NavButton from "./NavButton";

function PlanCard({ plan }: { plan: Plan }) {
  const isUnlimited = (feature: string) => {
    if (feature === "unlimited") {
      return true;
    } else {
      return false;
    }
  };

  const projectNum = plan.features.project_number; // "1" or "unlimited"
  const memberNum = plan.features.member;

  return (
    <div className="text-left">
      <div className="border-default block w-60 rounded border border-gray-200 p-6 shadow-md">
        <h5 className="text-heading mb-3 text-3xl leading-8 font-semibold tracking-tight capitalize">
          {plan.name} Plan
        </h5>

        <ul className="text-body mb-6 list-disc pl-5">
          <li>Unlimited file uploads</li>
          <li>Responsive design</li>
          <li>Access anywhere</li>

          <li
            className={
              isUnlimited(plan.features.project_number)
                ? "text-green-600"
                : "text-black"
            }
          >
            {projectNum} {projectNum === "1" ? "project" : "projects"}
          </li>

          <li
            className={
              isUnlimited(plan.features.member)
                ? "text-green-600"
                : "text-black"
            }
          >
            {memberNum} member
          </li>
        </ul>

        <p className="text-xl font-bold">
          Price: {Number(plan.price) === 0 ? "Free" : `$${plan.price} / month`}
        </p>
        <NavButton to="/signup" text="Sign up" />
      </div>
    </div>
  );
}

export default PlanCard;
