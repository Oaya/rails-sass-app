import { NavLink } from "react-router-dom";

function PlanCard() {
  return (
    <div>
      <div className="bg-neutral-primary-soft border-default rounded-base block max-w-sm border p-6 shadow-xs">
        <h5 className="text-heading mb-3 text-2xl leading-8 font-semibold tracking-tight">
          Plan Name
        </h5>
        <ul className="text-body mb-6">
          <li>Unlimited file uploads</li>
          <li>Responsive design</li>
          <li>Access anywhere</li>
          <li> project</li>
        </ul>

        <p>Price</p>

        <NavLink
          to="/signup"
          className="bg-brand hover:bg-brand-strong focus:ring-brand-medium rounded-base box-border inline-flex items-center border border-transparent px-4 py-2.5 text-sm leading-5 font-medium text-white shadow-xs focus:ring-4 focus:outline-none"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
}

export default PlanCard;
