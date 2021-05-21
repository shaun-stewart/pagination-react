import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import Pagination from "./Pagination";




const story = storiesOf("Pagination", module);

story.add("Default", () => {

    const tableData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    const [dataToDisplay, setDataToDisplay] = useState([]);

    const onPageChanged = data => {

        const { currentPage, perPageLimit } = data;

        const offset = (currentPage - 1) * perPageLimit;

        setDataToDisplay( tableData.slice(offset, offset + perPageLimit) );
    };


    return (
        <div>
            <div>{dataToDisplay}</div>
            <Pagination totalRecords={tableData.length} perPageLimit={5} pageNeighbours={1} onPageChanged={onPageChanged}/>
        </div>
    );
});
