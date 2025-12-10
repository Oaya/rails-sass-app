import Header from "../components/layout/Header";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="px-30 py-20">
        <section className="h-100 rounded-xl bg-[url('/src/assets/jumbotron.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
          {/* Center content vertically + horizontally */}
          <div className="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-center px-4 py-24 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">
              Welcome to the Project Management Application!
            </h1>

            <p className="mb-8 text-base font-normal text-white sm:px-16 md:text-xl lg:px-48">
              You'll love managing your project with our SaaS application.
              Please take a look at our great plans.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;
{
  /* <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4">
            <button
              type="button"
              className="bg-brand hover:bg-brand-strong focus:ring-brand-medium rounded-base box-border inline-flex items-center justify-center border border-transparent px-5 py-3 text-base font-medium text-white shadow-xs focus:ring-4 focus:outline-none"
            >
              Getting started
              <svg
                className="ms-1.5 -me-0.5 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
            <button
              type="button"
              className="text-body bg-neutral-secondary-medium border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-neutral-tertiary rounded-base box-border border px-5 py-3 text-base leading-5 font-medium shadow-xs focus:ring-4 focus:outline-none"
            >
              Learn more
            </button>
          </div> */
}
