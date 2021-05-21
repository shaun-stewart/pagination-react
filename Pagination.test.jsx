import React from "react";
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import Pagination from "./Pagination";
import {fetchPageNumbers, range, ELLIPSIS, PREVIOUS_PAGE, NEXT_PAGE} from "./PaginationPageUtils";



describe("Pagination", () => {
    it("should render pagination numbers properly", () => {
        const pagination = renderer
            .create(<Pagination totalRecords={15} perPageLimit={5} pageNeighbours={1} onPageChanged={()=>{}}/>)
            .toJSON();
        expect(pagination).toMatchSnapshot();
    });

    it("should render pagination dots properly", () => {
        const pagination = renderer
            .create(<Pagination totalRecords={15} perPageLimit={5} pageNeighbours={1} onPageChanged={()=>{}} renderDots/>)
            .toJSON();
        expect(pagination).toMatchSnapshot();
    });

    it("should default first number as active", () =>{
        const pagination = mount(
            <Pagination totalRecords={15} perPageLimit={5} pageNeighbours={1} onPageChanged={()=>{}}/>
        );
        expect(pagination.find('.page-item').length).toEqual(3);
        expect(pagination.find('.page-item').at(0).hasClass('active')).toEqual(true);
        expect(pagination.find('.page-item').at(2).hasClass('active')).toEqual(false);
    });

    it("should set selected number as active", () =>{
        const pagination = mount(
            <Pagination totalRecords={15} perPageLimit={5} pageNeighbours={1} onPageChanged={()=>{}}/>
        );
        expect(pagination.find('.page-item').length).toEqual(3);
        expect(pagination.find('.page-item').at(0).hasClass('active')).toEqual(true);
        expect(pagination.find('.page-item').at(2).hasClass('active')).toEqual(false);
        pagination.find('.page-link').at(2).simulate('click');
        expect(pagination.find('.page-item').at(0).hasClass('active')).toEqual(false);
        expect(pagination.find('.page-item').at(2).hasClass('active')).toEqual(true);

    });
});


describe("range method in pagination page utils", () => {
    it("should return correct range", () => {
       const returnedRange = range(1,10);
       expect(returnedRange.length).toBe(10);
       expect(returnedRange[0]).toBe(1);
       expect(returnedRange[5]).toBe(6);
       expect(returnedRange[9]).toBe(10);
    });
});

describe("fetchPageNumbers method in pagination page utils", () => {
    it("should return a range of (1 to total pages) if total pages is less that total blocks", () => {

        /**
         * totalNumbers: the total page numbers to show on the control (2*page neighbours + current page + 2 ellipsis
         * (if an ellipsis is unneeded, an additional number will be displayed in its place to maintain placing)
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */

        const totalPages = 3;
        const pageNeighbours = 1;
        const currentPage = 1;
        const pageNumbers = fetchPageNumbers(totalPages, pageNeighbours, currentPage);

        expect(pageNumbers.length).toBe(3);
        expect(pageNumbers[0]).toBe(1);
        expect(pageNumbers[2]).toBe(3);
    });



    it("should return correct page numbers, including next page and an ellipsis before last number, if total pages is greater that total blocks" +
        "  and current page + page neighbours < total pages - 1", () => {

        /**
         * totalNumbers: the total page numbers to show on the control (2*page neighbours + current page + 2 ellipsis
         * (if an ellipsis is unneeded, an additional number will be displayed in its place to maintain placing)
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */

        const totalPages = 15;
        const pageNeighbours = 1;
        const currentPage = 1;
        const pageNumbers = fetchPageNumbers(totalPages, pageNeighbours, currentPage);

        const expectedArray = [1,2,3,4,5, ELLIPSIS, 15, NEXT_PAGE];
        expect(pageNumbers.length).toBe(8);
        expect(pageNumbers).toStrictEqual(expectedArray);

    });

    it("should return correct page numbers, including previous page and an ellipsis after first number, if total pages is greater that total blocks" +
        "  and current page - page neighbours > 2", () => {

        /**
         * totalNumbers: the total page numbers to show on the control (2*page neighbours + current page + 2 ellipsis
         * (if an ellipsis is unneeded, an additional number will be displayed in its place to maintain placing)
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */

        const totalPages = 15;
        const pageNeighbours = 1;
        const currentPage = 15;
        const pageNumbers = fetchPageNumbers(totalPages, pageNeighbours, currentPage);

        const expectedArray = [PREVIOUS_PAGE,1,ELLIPSIS,11,12,13,14,15];
        expect(pageNumbers.length).toBe(8);
        expect(pageNumbers).toStrictEqual(expectedArray);

    });

    it("should return correct page numbers, including next and previous page and two ellipsis, if total pages is greater that total blocks" +
        " and current page + page neighbours < total pages - 1" +
        " and current page - page neighbours > 2", () => {

        /**
         * totalNumbers: the total page numbers to show on the control (2*page neighbours + current page + 2 ellipsis
         * (if an ellipsis is unneeded, an additional number will be displayed in its place to maintain placing)
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */

        const totalPages = 15;
        const pageNeighbours = 1;
        const currentPage = 7;
        const pageNumbers = fetchPageNumbers(totalPages, pageNeighbours, currentPage);

        const expectedArray = [PREVIOUS_PAGE,1,ELLIPSIS, 6,7,8, ELLIPSIS, 15, NEXT_PAGE];
        expect(pageNumbers.length).toBe(9);
        expect(pageNumbers).toStrictEqual(expectedArray);

    });
});