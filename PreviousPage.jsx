import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

const PreviousPage = ({ onClickHandler})=>{
    return (
        <li className="page-item">
            <a
                className="page-link"
                href="/#"
                aria-label="Previous"
                onClick={onClickHandler}
            >
                <Icon name="chevron-left"/>
            </a>
        </li>
    );
};
PreviousPage.propTypes = {
    onClickHandler: PropTypes.func.isRequired
};

export default PreviousPage;