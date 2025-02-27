const Heading = ({ title }) => {
  return ( 
    <div className="mt-5 w-full">
    <section className="bg-white-700 mb-7 px-6 py-2 w-full">
      <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900">
        {title}
      </h1>
    </section>
    </div>
  );
};

export default Heading;
