import React from 'react'

export const Category = ({ title ,products }) => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    {`${title}  (${products.length}) `}
                </div>
            </div>
        </div>
    )
}