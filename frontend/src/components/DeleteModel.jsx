import React from 'react'

export default function DeleteModel({ isOpen, onClose, onDelete }) {
  if(!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onMouseDown = {onClose}>
        <div className="modal" onMouseDown={e => e.stopPropagation()}>
          <div style={{textAlign: 'center'}}>
            {/* <div>delete icon</div> */}
            <p style={{marginBottom: 18}}>are you sure you want to delete the selected item?</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <button className='btn primary' onClick={onDelete}>Delete</button>
              <button className='btn outline' onClick={onClose}>Cencel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};