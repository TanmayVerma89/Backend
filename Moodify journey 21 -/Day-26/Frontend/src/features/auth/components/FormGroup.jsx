import React from 'react'

const FormGroup = ({value, setValue, label, placeholder }) => {
    return (
        <div className="form-group">
            <input
                value={value}
                onChange={(e)=>{setValue(e.target.value)}}
                type="text" id={label} name={label} placeholder={label} />
        </div>
    )
}

export default FormGroup