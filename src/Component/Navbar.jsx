import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import Login from './Login';

const Navbar1 = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className='nav' style={{display:'flex', justifyContent:'space-between' }}>
        <Link to='/'>Home</Link>
        <Link to='/product'>Product</Link>
        <Link to='/addproduct'>Add Product</Link>
        <button 
          onClick={() => setModalShow(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontFamily: '"Bebas Neue", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '30px',
            cursor: 'pointer',
            padding: '0 20px'
          }}
        >
          Login
        </button>
      </div>
      <Login
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Navbar1;