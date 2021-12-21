import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import DatePicker from '../components/DatePicker';
import Loader from '../components/Loader';
import SearchBar from '../components/Search';
import SortBy from '../components/SortBy';
import StateCard from '../components/StateCard';
import { ERROR_MESSAGE, HOME_DATE_LOCAL_KEY, HOME_SEARCH_LOCAL_KEY, HOME_SORTBY_LOCAL_KEY, NO_RESULTS_FOUND, SORT_BY_LIST, SORT_FILTER, STATE_LIST } from '../utils/constants';
import { getItemFromLocal, isEmpty, setItemToLocal, sortByAlphOrder, sortByOrder } from '../utils/utils';
import './HomeScreen.css'

const HomeScreen = (props) => {
    const navigate = useNavigate();
    const [covidData, setCovidData] = useState(props?.covidData)
    const [search, setSearch] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [sortBy, setSortBy] = useState('')

    useEffect(() => {
        setCovidData(props?.covidData)
        let localSearchData = getItemFromLocal(HOME_SEARCH_LOCAL_KEY)
        let localSortByData = getItemFromLocal(HOME_SORTBY_LOCAL_KEY)
        let localDateData = getItemFromLocal(HOME_DATE_LOCAL_KEY)
        if(localSearchData){
            !isEmpty(localSearchData) && setSearch(localSearchData)
        }
        if(localSortByData){
            if(!isEmpty(localSortByData)){
                setSortBy(localSortByData)
                let sortedCovidData = sortByOrder(props.covidData, SORT_FILTER[localSortByData].key, SORT_FILTER[localSortByData].order)
                setCovidData(sortedCovidData)
            }
        }
        if(localDateData){
            if(!isEmpty(localDateData)) {
                setDateFilter(localDateData)
                setCovidDataByDate(localDateData)
            }
                
        }
    },[props?.covidData])

    const filterDataCallback = useCallback(() => {
        const filterData = covidData?.filter((state, index) => {
            return STATE_LIST[state.name]?.toLowerCase() ? STATE_LIST[state.name]?.toLowerCase().includes(search.toLowerCase().trim()) : state.name.toLowerCase().includes(search.toLowerCase().trim())
        })
        return filterData
    },[covidData, search])

    const onChangeSearch = (event) => {
        let search = event.target.value
        setSearch(search)
        setItemToLocal(HOME_SEARCH_LOCAL_KEY, search)
    }

    const onChangeDate = (event) => {
        let date = event.target.value
        setDateFilter(date)
        setItemToLocal(HOME_DATE_LOCAL_KEY, date)
        if(isEmpty(date)){
            setCovidData(props?.covidData);
        } else {
            setCovidDataByDate(date)
        }
    }

    const setCovidDataByDate = (date) => {
        let stateDataByDate = props?.covidData?.filter((state, index) => {
            return state?.getStateDataByDate(date) !== undefined
        })
        ?.map((state, index) => {
            return state?.getStateDataByDate(date)
        })
        setCovidData(stateDataByDate);
    }

    const onChangeSortBy = (event) => {
        let sortBy = event.target.value
        setItemToLocal(HOME_SORTBY_LOCAL_KEY, sortBy)
        if(sortBy !== '') {
            let sortedCovidData = sortByOrder(covidData, SORT_FILTER[sortBy].key, SORT_FILTER[sortBy].order)
            setCovidData(sortedCovidData)
            setSortBy(sortBy)
        } else {
            setSortBy(sortBy)
            let sortedCovidData = sortByAlphOrder(covidData)
            setCovidData(sortedCovidData)
        }
    }

    const onClickStateCard = (state) => {
        navigate('/detailScreen', {state})
    }

    const onClearFilter = () => {
        if(!isEmpty(dateFilter) || !isEmpty(sortBy) || !isEmpty(search)){
            let resetCovidData = sortByAlphOrder(props.covidData)
            setCovidData(resetCovidData);
            setDateFilter('')
            setItemToLocal(HOME_DATE_LOCAL_KEY, '')
            setSortBy('')
            setItemToLocal(HOME_SORTBY_LOCAL_KEY, '')
            setSearch('')
            setItemToLocal(HOME_SEARCH_LOCAL_KEY, '')
        }
    }

    return(
        <div className='container'>
            <div className='filter_container'>
                <h6 className='filter_title'>{'States'}</h6>
                <SearchBar id="search" type={"text"} className='search' name={'search'} placeholder='Search by state name' search={search} onChangeSearch={onChangeSearch}/>
                <DatePicker id="date" type={"date"} className='date_filter' name={'date'} dateFilter={dateFilter} onChangeDate={onChangeDate} />
                <SortBy id="sortBy" className='sortby_filter' name={"sortBy"} sortByList={SORT_BY_LIST} placeholder='Sort By' sortBy={sortBy} onChange={onChangeSortBy} />
                <span className='clear_filter' onClick={onClearFilter}>{'clear filters'}</span>
            </div>
            <div className='card_container'>
                {props?.isFetchingPending && <Loader />}
                {covidData &&
                    filterDataCallback()?.map((state, index) => {
                        return(
                            <StateCard key={`card_${index}`} index={index} state={state} onClick={onClickStateCard}/>
                        )
                    })
                }
                {
                    filterDataCallback()?.length === 0 && 
                    !props?.isFetchingPending && !props?.isError && <div className='no_results_found'><p>{NO_RESULTS_FOUND}</p></div>
                }
                {
                    props?.isError && <div className='no_results_found'><p>{ERROR_MESSAGE}</p></div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        covidData: state?.covidDataReducer?.covidData,
        isFetchingPending: state?.covidDataReducer?.isFetchingPending,
        isError: state?.covidDataReducer?.isError,
    }
}

export default connect(mapStateToProps, {})(HomeScreen);
