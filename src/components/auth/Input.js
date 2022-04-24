import React from 'react'

function Input({name, placeholder, type, handleChange}) {
    return (
        <div>
            <input 
            className='px-2 py-1 mb-3 rounded-md outline-none '
            name = {name}
            placeholder= {placeholder}
            type={type}
            onChange={handleChange}
            required
            />
        </div>
    )
}

export default Input
