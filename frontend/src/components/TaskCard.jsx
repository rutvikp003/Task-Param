import React from 'react';
import { RiEditCircleFill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function TaskCard({task, onEdit, onDelete}) {
  return (
    <>
        <div className='card'>
            <p>{task.text}</p>
            <div className="actions">
                <button className='btn-icon' onClick={onEdit} title='Edit'><RiEditCircleFill  /></button>
                <button className='btn-icon' onClick={onDelete} title='Delete'><RiDeleteBin6Fill /></button>
            </div>
        </div>
    </>
    )
};