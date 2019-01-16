import React, { Component } from 'react';
import { PaginationRow } from 'patternfly-react';
import PropTypes from 'prop-types';

import { generateID } from '../../functions/generateID.js';

export const dropDirection = {
    up: 'up',
    down: 'down'
};

const pager = [ 10, 15, 20, 25, 50 ];

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.defaultFirstPage = this.defaultFirstPage.bind(this);
        this.defaultLastPage = this.defaultLastPage.bind(this);
        this.defaultPreviousPage = this.defaultPreviousPage.bind(this);
        this.defaultNextPage = this.defaultNextPage.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    setPage(page, debounce = false) {
        const perPage = this.props.itemsPerPage || pager[0];
        const maxPage = Math.ceil(this.props.numberOfItems / perPage);
        page = isNaN(page) ? 1 : page;
        page = page > maxPage ? maxPage : page;
        this.props.hasOwnProperty('onSetPage') && this.props.onSetPage(page, debounce);
    }

    defaultFirstPage() {
        this.setPage(1);
    }

    defaultLastPage() {
        const perPage = this.props.itemsPerPage || pager[0];
        this.setPage(Math.ceil(this.props.numberOfItems / perPage));
    }

    defaultPreviousPage() {
        const { page = 1 } = this.props;
        this.setPage(page - 1);
    }

    defaultNextPage() {
        const { page = 1 } = this.props;
        this.setPage(page + 1);
    }

    render() {
        let { page } = this.props;
        const perPage = this.props.itemsPerPage || pager[0];
        const perPageOptions = this.props.perPageOptions || pager;
        const lastPage = Math.ceil(this.props.numberOfItems / perPage);
        let lastIndex = page === lastPage ? this.props.numberOfItems : page * perPage;
        let firstIndex = page === 1 ? 1 : page * perPage - perPage;
        if (this.props.numberOfItems === 0) {
            lastIndex = 0;
            firstIndex = 0;
        }

        return (
            <div className="special-patternfly" widget-type='InsightsPagination'>
                { typeof PaginationRow !== 'undefined' && <PaginationRow
                    { ...this.props }
                    pageInputValue={ this.props.page || 1 }
                    viewType={ this.props.viewType || 'table' }
                    pagination={ { perPage, page, perPageOptions } }
                    amountOfPages={ lastPage || 1 }
                    itemCount={ this.props.numberOfItems }
                    itemsStart={ firstIndex }
                    pageSizeDropUp={ this.props.direction === 'up' }
                    itemsEnd={ lastIndex }
                    onPerPageSelect={ this.props.onPerPageSelect }
                    onPageInput={ event => this.setPage(parseInt(event.target.value, 10), true) }
                    onFirstPage={ this.props.onFirstPage || this.defaultFirstPage }
                    onLastPage={ this.props.onLastPage || this.defaultLastPage }
                    onPreviousPage={ this.props.onPreviousPage || this.defaultPreviousPage }
                    onNextPage={ this.props.onNextPage || this.defaultNextPage }
                /> }
            </div>
        );
    }
}

Pagination.propTypes = {
    direction: PropTypes.oneOf(Object.keys(dropDirection)),
    viewType: PropTypes.string,
    itemsPerPage: PropTypes.number,
    perPageOptions: PropTypes.arrayOf(PropTypes.number),
    numberOfItems: PropTypes.number.isRequired,
    onSetPage: PropTypes.func,
    onPerPageSelect: PropTypes.func
};

Pagination.defaultProps = {
    page: 1
};

export default Pagination;
