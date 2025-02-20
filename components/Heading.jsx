const Heading = ({ title }) => {
  return ( 
    <section className="bg-white-100 mb-7 shadow px-6 py-6 w-full">
      <h1 className="text-2xl text-center font-bold tracking-tight text-gray-900">
        {title}
      </h1>
    </section>
  );
};

export default Heading;
