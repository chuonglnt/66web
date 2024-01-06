const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="text-right bg-black">
      <p className="text-white font-thin mx-2 py-0">
        Copyright © {year} Design by 66Store - Chương Lê
      </p>
    </div>
  );
};

export default Copyright;
