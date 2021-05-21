import React from "react";
import PropTypes from "prop-types";

const PageNumber = ({ pageNumber, selected, onClickHandler})=>{
    return (
        <li className={`page-item${ selected ? " active" : ""}`}>
            <a
                className="page-link"
                href="/#"
                onClick={e => onClickHandler(pageNumber, e)}
            >
                {pageNumber}
            </a>
        </li>
    );
};
PageNumber.propTypes = {
    pageNumber:  PropTypes.number.isRequired,
    selected:  PropTypes.bool.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export default PageNumber;