import { NavLink } from "react-router-dom";
import type { Plan } from "../../pages/Home";

function PlanCard({ plan }: { plan: Plan }) {
  const projectNum = plan.features.project_number; // "1" or "unlimited"
  const isUnlimited = projectNum === "unlimited";

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

          <li className={isUnlimited ? "text-green-600" : "text-black"}>
            {projectNum} {projectNum === "1" ? "project" : "projects"}
          </li>
        </ul>

        <p className="text-xl font-bold">
          Price: {plan.price === "0" ? "Free" : `$ ${plan.price}`}
        </p>

        <NavLink
          to="/signup"
          className="bg-pink mt-2 box-border inline-flex items-center rounded border border-transparent px-4 py-2.5 text-sm leading-5 font-medium text-white shadow-xs focus:ring-4 focus:outline-none"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
}

export default PlanCard;
