import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="px-30 py-20 text-center">
      <h1> This is Home Page</h1>
      <h2> {user?.first_name}</h2>
    </div>
  );
};
export default Home;
