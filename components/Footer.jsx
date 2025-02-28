const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-6 bg-footer mt-auto'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <p className='text-center text-sm text-main'>
          &copy; {currentYear} Bookings. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;