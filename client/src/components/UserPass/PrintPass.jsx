import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import UserPass from "./UserPass";
import Header from '../Header/Header';
import {useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const PrintPass = () => {

  const location = useLocation();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (

    <div>
      <Header />
      <div className="d-flex justify-content-center">
        <div className="mb-3">
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <UserPass ref={componentRef} />
                <ReactToPrint
                  trigger={() =>
                    <button type="button" className="btn btn-dark btn-lg btn-block">
                      Print
                    </button>
                    }
                  content={() => componentRef.current}

                />
              </form>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );

};

export default PrintPass;
