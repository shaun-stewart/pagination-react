import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import PaginationDots from "./PaginationDots";
import PaginationNumbers from "./PaginationNumbers";
import {fetchPageNumbers, range} from "./PaginationPageUtils";
import "../semantic-ui/definitions/pagination.less";

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, perPageLimit, pageNeighbours, renderDots} = props;

    this.perPageLimit = typeof perPageLimit === "number" ? perPageLimit : 10;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
    this.renderDots = renderDots;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.perPageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      perPageLimit: this.perPageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handlePreviousPageClick = evt => {
    evt.preventDefault();
    const { currentPage } = this.state;

    this.gotoPage(currentPage - 1);
  };

  handleNextPageClick = evt => {
    evt.preventDefault();
    const { currentPage } = this.state;

    this.gotoPage(currentPage  + 1);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { renderDots, totalPages, pageNeighbours, handleClick, handlePreviousPageClick, handleNextPageClick } = this;
    const { currentPage } = this.state;

    return( <div data-test="pagination"><ul className="pagination">
            {
                renderDots ? <PaginationDots pages={range(1, totalPages)}
                                             currentPage={currentPage}
                                             onClickHandler={handleClick}/>
                            :
                            <PaginationNumbers pages={fetchPageNumbers(totalPages, pageNeighbours, currentPage)}
                                               currentPage={currentPage}
                                               onClickHandler={handleClick}
                                               onPreviousPageClickHandler={handlePreviousPageClick}
                                               onNextPageClickHandler={handleNextPageClick}/>
            }
            </ul></div>
    );
  }
}

/*
totalRecords - indicates the total number of records to be paginated.

perPageLimit - indicates the number of records to be shown per page. If not specified, it defaults to 30 as defined in the constructor().

pageNeighbours - indicates the number of additional page numbers to show on each side of the current page.
The minimum value is 0 and the maximum value is 2.
If not specified, it defaults to 0 as defined in the constructor().

onPageChanged - is a function that will be called with data of the current pagination state only when the current page changes.

renderDots - whether navigation should be displayed as dots (as seen in swiping components) or standard numbered pages
 */
Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  perPageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
  renderDots: PropTypes.bool
};

Pagination.defaultProps = {
  perPageLimit: 10,
  pageNeighbours: 0,
  renderDots: false
};

export default Pagination;
