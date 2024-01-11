const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="text-right">
      <p className="text-stale-700 text-xs font-serif mx-2 py-0">
        Copyright © {year} Design by 66Store - Chương Lê
      </p>
    </div>
  );
};

export default Copyright;
