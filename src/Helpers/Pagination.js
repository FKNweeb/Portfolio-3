export const paginate = (items, currentPage, itemsPerPage) => {
    const indexLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    return {currentItems, totalPages};
};