// import React from 'react';
// import '../../style/pagination.css'

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div className="pagination">
//             {pageNumbers.map(number => (
//                 <button
//                     key={number}
//                     onClick={() => onPageChange(number)}
//                     className={number === currentPage ? "active" : ""}
//                 >
//                     {number}
//                 </button>
//             ))}
//         </div>
//     )
// }
// export default Pagination

import React from 'react'
import '../../style/pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={number === currentPage ? 'active' : ''}
                >
                    {number}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
