import React from "react";
import PropTypes from "prop-types";
import {ELLIPSIS, PREVIOUS_PAGE, NEXT_PAGE} from "./PaginationPageUtils";
import Ellipsis from "./Ellipsis";
import NextPage from "./NextPage";
import PreviousPage from "./PreviousPage";
import PageNumber from "./PageNumber";
import "../semantic-ui/definitions/pagination.less";
import UUIDFactory from "../helpers/UUIDFactory";

const getUUID = UUIDFactory("page");

const PaginationNumbers = ({pages, currentPage, onClickHandler, onPreviousPageClickHandler, onNextPageClickHandler}) => {

    const PageItemSelector = ({page}) => {
        switch(page) {
            case ELLIPSIS:
                return <Ellipsis />;
            case PREVIOUS_PAGE:
                return <PreviousPage onClickHandler={onPreviousPageClickHandler}/>;
            case NEXT_PAGE:
                return <NextPage  onClickHandler={onNextPageClickHandler}/>;
            default:
                return <PageNumber  pageNumber={page} selected={currentPage === page} onClickHandler={onClickHandler}/>;
        }
    };
    PageItemSelector.propTypes = {
        page: PropTypes.number.isRequired
    };

    return (
        <div>
            {pages.map((page, index) => {
                return <PageItemSelector key={getUUID()} page={page} index={index}/>
            })}
        </div>
    );
};

PaginationNumbers.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])).isRequired,
    currentPage: PropTypes.number.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    onPreviousPageClickHandler: PropTypes.func.isRequired,
    onNextPageClickHandler: PropTypes.func.isRequired
};

export default PaginationNumbers;