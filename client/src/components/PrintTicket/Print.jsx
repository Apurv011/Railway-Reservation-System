import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintTicket from "./PrintTicket";
import Header from '../Header/Header';
import {useLocation } from 'react-router-dom';

const Print = () => {

  const location = useLocation();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (

    <div>
      <Header guest={location.state.guest}/>
      <div className="d-flex justify-content-center">
        <div className="mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <PrintTicket ref={componentRef} ticket={location.state.ticket}/>
                <button type="button" onClick={handlePrint} className="btn btn-dark btn-lg btn-block">
                  Print
                </button>
              </form>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Print;
