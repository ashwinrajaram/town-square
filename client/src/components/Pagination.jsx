import React from "react";
import { Button, Box, Typography } from "@mui/material";

const Pagination = ({ currentPage, setCurrentPage, totalCount, postsPerPage }) => {
    const totalPages = Math.ceil(totalCount / postsPerPage);

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    return (
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Button onClick={handlePrevPage} disabled={currentPage === 0}>
                Previous
            </Button>
            <Typography>
                Page {currentPage + 1} of {totalPages}
            </Typography>
            <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                Next
            </Button>
        </Box>
    );
};

export default Pagination;
