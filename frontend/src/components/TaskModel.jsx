import React, {useState, useEffect, useRef} from 'react'

export default function TaskModel({ isOpen, onClose, onSubmit, initialValue = "" , mode = "create" }) {
    const ref = useRef(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(initialValue);
        if(isOpen) {
            setTimeout(() => {
                ref.current && ref.current.focus(), 100
            });
        }
    }, [initialValue, isOpen]);

    if(!isOpen) return null;

    const handleSubmit = () => {
        if(!value.trim()) return; //Khali validation
        onSubmit(value.trim());
    };
        
    return (
        <>
            <div className="modal-overlay" onMouseDown={onClose}>
                <div className="modal" onMouseDown={e => e.stopPropagation()}>
                    <h3>{mode === "create" ? "Create List" : "Edit List"}</h3>
                    <label>To-Do List <span style={{color:"#e11d48"}}>*</span> </label>
                    <textarea ref={ref} value={value} onChange={e => setValue(e.target.value)} placeholder='Details'/>
                    <div className="modal-actions">
                        <button className='btn primary' onClick={handleSubmit}>{mode === "create" ? "Submit" : "Update"}</button>
                        <button className='btn outline' onClick={onClose} >Cancle</button>
                    </div>
                </div>
            </div>


        </>
    )
}
