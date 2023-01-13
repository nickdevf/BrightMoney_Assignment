import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { v4 as uuidv4 } from 'uuid';
import AddBillForm from '../components/addBillModal';
import { addBill, filterBill } from '../features/bill/billSlice';
import Bills from '../components/listBills';
import CategoryDropdown from '../components/categoryDropdown';

function Home() {
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [show, setShow] = useState(false);
    const [currentCategories, setCurrentCategories] = useState([]);
    const dispatch = useDispatch();
    const totalBill = useSelector(state => state.bill.totalBill);
    const bills = useSelector(state => state.bill.bills);
    const filteredBills = useSelector(state => state.bill.filteredBills);

    const handleClose = () => {
        setDesc('');
        setCategory('');
        setAmount(0);
        setDate('');
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        setShow(false);
        dispatch(addBill({
            id: uuidv4(),
            desc,
            category,
            amount,
            date
        }))
    };
    const handleApplyFilters = () => {
        let x;
        if(currentCategories.length > 0) {
            x = [...bills].filter(bill => currentCategories.includes(bill.category));
            dispatch(filterBill(x));
        }
        else
            dispatch(filterBill(bills));
    }
    const [showFilter, setShowFilter] = useState(false);

    const handleCloseFilter = () => {
        setCurrentCategories([]);
        handleApplyFilters();
        setShowFilter(false);
    }
    const handleShowFilter = () => {
        if(currentCategories.length > 0)
            setCurrentCategories([]);
        handleApplyFilters();
        setShowFilter(true);
    }

    return (
        <div className='home'>
            <div style={{position:"absolute",right:50}}>
            {
                bills.map(bill => bill.category).length === 0?
                    (
                        <Button variant="primary" onClick={handleShowFilter} disabled>
                            Filter
                        </Button>
                    )
                    :
                    (
                        <Button variant="primary" onClick={handleShowFilter} active>
                            Filter
                        </Button>
                    )
                }
                
            </div>
            <Offcanvas show={showFilter} onHide={handleCloseFilter}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter Bills by Category</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CategoryDropdown currentCategories={currentCategories} setCurrentCategories={setCurrentCategories} />
                    <Button variant="primary" onClick={() => {
                        handleApplyFilters();
                        setShowFilter(false);
                    }} className='apply-filters-button'>
                        Apply Filters
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>

            <Bills
                bills={filteredBills}
                desc={desc}
                setDesc={setDesc}
                category={category}
                setCategory={setCategory}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
            />
            <div className='bill-footer'>
                <Button variant='primary' onClick={handleShow}>Add bill</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBillForm setDesc={setDesc} setCategory={setCategory} setAmount={setAmount} setDate={setDate} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <span className='h3' style={{color:'white',position:"absolute",bottom:10,left:10}} >Total bill: Rs {totalBill}</span>
        </div>
    );
}

export default Home;