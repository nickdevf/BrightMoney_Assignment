import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HighlightedBill from '../components/highlightedBill';
import '../styles/currentBill.css';

function CurrentBill() {
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    const [currentBills, setCurrentBills] = useState([]);
    const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const [currentMonth, setCurrentMonth] = useState(1);
    const bills = useSelector(state => state.bill.bills);

    useEffect(() => {
        let totalBill = 0;
        const currBill = bills.filter((bill) => {
            if (totalBill + bill.amount <= monthlyBudget && parseInt(bill.date.split('-')[1])===currentMonth) {
                totalBill += bill.amount;
                return true;
            }
            else
                return false;
        });
        setCurrentBills(currBill);
    }, [monthlyBudget, currentMonth, bills]);

    return (
        <div className='current-bill-page-container' style={{color:"white"}}>
            <p className='h2 text-center mt-6 mb-5 '>Bills to be Paid</p>  
            <div className="MonthlyInner center mb-5 mx-3">
                <div className='me-3'>
            <label htmlFor='monthInput' className='me-2'>Pick your Budget : </label>
            <input type='number' value={monthlyBudget} placeholder='Set monthly budget' onInput={e => setMonthlyBudget(parseInt(e.target.value))} />
                </div>
                <div>
                        <label htmlFor='monthInput' className='me-2'>Pick a month : </label>
                        <select id='monthInput' name='month' value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value))}>
                            {
                                monthArray.map(
                                    (month, id) => <option key={id} value={id+1}>{month}</option>
                                )
                            }
                        </select>
                </div>
            
            </div>
            
            <div className='highlighted-bill-cards'>
                {currentBills.map(bill => <HighlightedBill bill={bill} key={bill.id}/>)}
            </div>
            <p className='h4 text-center mb-6' style={{position:"absolute",bottom:10,left:10}}>Monthly budget: Rs {monthlyBudget}</p>
        </div>
    );
}

export default CurrentBill;