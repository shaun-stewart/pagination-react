import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

const NextPage = ({ onClickHandler})=>{
    return (
        <li className="page-item">
            <a
                className="page-link"
                href="/#"
                aria-label="Next"
                onClick={onClickHandler}
            >
                <Icon name="chevron-right"/>
            </a>
        </li>
    );
};
NextPage.propTypes = {
    onClickHandler: PropTypes.func.isRequired
};

export default NextPage;