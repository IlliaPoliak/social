import React, { useState } from 'react';
import s from './Pagination.module.css'
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number, 
    pageSize: number, 
    currentPage: number, 
    handlePageNumberClick: (pageNumber: number) => void, 
    portionSize?: number
}

const Pagination: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, handlePageNumberClick, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pagesNumbers: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pagesNumbers.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, serPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    let pages = pagesNumbers
        .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map((page) => (
            <span key={page}
                className={ cn(s.pagination_page_number, { [s.selected]: currentPage === page })}
                onClick={() => handlePageNumberClick(page)}>
                {page}
            </span>
        ))

    return (
        <div className={s.wrapper}> 
            <button 
                disabled={ currentPage !== 1 ? false : true }
                onClick={() => {
                    serPortionNumber(1)
                    handlePageNumberClick(1) 
                }}>first
            </button>
            <button 
                disabled={ portionNumber > 1 ? false : true }
                onClick={() => {
                    serPortionNumber(portionNumber - 1)
                    handlePageNumberClick(leftPortionPageNumber - portionSize) 
                    }}>prev
            </button>

            <div className={s.pagination}>{pages}</div>

            <button 
                disabled={ portionNumber < portionCount ? false : true }
                onClick={() => {
                    serPortionNumber(portionNumber + 1)
                    handlePageNumberClick(rightPortionPageNumber + 1)                     
                    }}>next
            </button>
            <button 
                disabled={ currentPage !== pagesCount ? false : true }
                onClick={() => {
                    serPortionNumber(portionCount)
                    handlePageNumberClick(pagesCount) 
                }}>last ({pagesCount})
            </button>
        </div>
    )
}

export default Pagination;