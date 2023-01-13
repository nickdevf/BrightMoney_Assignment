import React from 'react';
import '../styles/addBillModal.css';

function AddBillForm({ setDesc, setCategory, setAmount, setDate })
{
    return (
        <div>
            <form>
                <div className='individual-entry'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' id='description' placeholder='Enter Bill Description' onInput={e => setDesc(e.target.value)}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='category'>Category</label>
                    <input type='text' id='category' placeholder='Enter Bill Category' onInput={e => setCategory(e.target.value)}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='amount'>Amount</label>
                    <input type='number' id='amount' placeholder='Enter Bill Amount' onInput={e => setAmount(parseInt(e.target.value))}/>
                </div>
                <div className='individual-entry'>
                    <label htmlFor='date'>Date</label>
                    <input type='date' id='date' onInput={e => setDate(e.target.value.split('-').reverse().join('-'))}/>
                </div>
            </form>
        </div>
    );
}

export default AddBillForm;