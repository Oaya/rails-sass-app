// import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
// import Toast from "../components/ui/Toast";
// import { createProjectRequest } from "../services/projects";
// import type { Project } from "../types/project";

const Home = () => {
  const { user } = useAuth();
  // const [error, setError] = useState<string | null>(null);
  // const [message, setMessage] = useState<string | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="m-10 mx-auto w-150 text-2xl">
      <h1></h1>
      <h2>Hello, {user?.first_name}</h2>
      <p>Your organization is {user?.tenant_name}</p>

      {/* <div className="fixed top-20 right-8 z-50 space-y-2">
        {error && <Toast message={error} type="error" />}
        {message && <Toast message={message} type="success" />}
      </div> */}
    </div>
  );
};
export default Home;
