import React from 'react'
// import PropTypes from 'prop-types'

const SectionHeading = ({ title }) => {
    return (
        <div className='flex flex-wrap px-10 my-5'>
            <div className='border rounded bg-black w-2 h-10'>
            </div>
            <p className='text-3xl'>{title}</p>
        </div>
    )
    // SectionHeading.defaultProps = {

    // }
    // SectionHeading.propTypes = {
    //     title: String
    // }
}

export default SectionHeading