import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import "../semantic-ui/definitions/pagination.less";

const PaginationDots = ({pages, currentPage, onClickHandler}) => {

    return (
<div>
                {pages.map((page, index) => {
                    return (
                        <li key={index}
                            className={`page-item${
                                currentPage === page ? " active" : ""
                            }`}
                        >
                            <a
                                className="page-link"
                                href="/#"
                                onClick={e => onClickHandler(page, e)}
                            >
                                <Icon name={currentPage === page ? "swipe-circle-active" : "swipe-circle-inactive"}/>
                            </a>
                        </li>
                    );
                })}
</div>

    );
};

PaginationDots.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentPage: PropTypes.number.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export default PaginationDots;