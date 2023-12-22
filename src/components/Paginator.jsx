export const Paginator = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          } flex items-center justify-center px-4 h-10 mx-1 text-base font-medium border border-gray-300 rounded-lg`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const goToPage = (page) => {
    if (page !== currentPage) {
      // Only navigate if the selected page is different from the current page
      if (page > currentPage) {
        goToNextPage();
      } else {
        goToPreviousPage();
      }
    }
  };

  return (
    <>
      <div className="p-8">
        <div className="flex items-center justify-end">
          {currentPage > 1 && (
            <button
              onClick={goToPreviousPage}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              Previous
            </button>
          )}

          {renderPageNumbers()}

          {currentPage < totalPages && (
            <button
              onClick={goToNextPage}
              className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};
