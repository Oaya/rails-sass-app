import { useEffect, useState } from "react";
import PlanCard from "../components/ui/PlanCard";
import { getPlans } from "../services/plans";
import type { Plan } from "../types/plan";

const Welcome = () => {
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[] | []>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getPlans();
        setPlans(fetchedPlans);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="px-30 py-20 text-center">
      <section className="h-100 rounded-xl bg-[url('/src/assets/jumbotron.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">
            Welcome to the Project Management Application!
          </h1>

          <p className="mb-8 text-base font-normal text-white sm:px-16 md:text-xl lg:px-48">
            You'll love managing your project with our SaaS application. Please
            take a look at our great plans.
          </p>
        </div>
      </section>

      {!error && plans.length && (
        <section className="pt-10">
          <h1 className="text-2xl">
            Select the Plan that you are are interested!
          </h1>

          <div className="flex justify-center gap-10 pt-8">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default Welcome;
