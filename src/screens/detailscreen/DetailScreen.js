import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StateCovidData from '../../objects/StateCovidData';
import DatePicker from '../components/DatePicker';
import SortBy from '../components/SortBy';
import { DETAIL_DATE_LOCAL_KEY, DETAIL_SORTBY_LOCAL_KEY, NO_RESULTS_FOUND, SORT_BY_LIST, SORT_FILTER } from '../utils/constants';
import { getItemFromLocal, isEmpty, setItemToLocal, sortByOrderObject } from '../utils/utils';
import './DetailScreen.css'

const DetailScreen = (props) => {
    const { state } = useLocation();
    let stateDataObject = new StateCovidData()
    stateDataObject.mapFromStateCovidDataJson(state)
    stateDataObject.mapFromStateDatesJson(state)
    const [stateData] = useState(stateDataObject)
    const [stateObjectKeys, setStateObjectKeys] = useState(Object.keys(stateDataObject?.dates))
    const [dateFilter, setDateFilter] = useState('')
    const [sortBy, setSortBy] = useState('')
    const[selectedDistrict, setSelectedDistrict] = useState('')

    useEffect(() => {
        let localSortByData = getItemFromLocal(DETAIL_SORTBY_LOCAL_KEY)
        let localDateData = getItemFromLocal(DETAIL_DATE_LOCAL_KEY)
        if(localSortByData){
            if(!isEmpty(localSortByData)){
                setSortBy(localSortByData)
                let sortedKeys = sortByOrderObject(stateData?.dates, SORT_FILTER[localSortByData].key, SORT_FILTER[localSortByData].order)
                setStateObjectKeys(sortedKeys)
            }
        }
        if(localDateData){
            if(!isEmpty(localDateData)){
                setDateFilter(localDateData)
            }
        }
    },[])

    const filterDataCallback = useCallback(() => {
        const filterData = stateObjectKeys
        ?.filter((date) => {
            return dateFilter === '' ? true : date === dateFilter
        })
        return filterData
    },[dateFilter, stateObjectKeys])

    const onChangeDate = (event) => {
        let date = event.target.value
        setDateFilter(date)
        setItemToLocal(DETAIL_DATE_LOCAL_KEY, date)
    }

    const onChangeSortBy = (event) => {
        let sortBy = event.target.value
        setItemToLocal(DETAIL_SORTBY_LOCAL_KEY, sortBy)
        if(!isEmpty(sortBy)) {
            if(filterDataCallback().length > 0) {
                let sortedKeys = sortByOrderObject(stateData?.dates, SORT_FILTER[sortBy].key, SORT_FILTER[sortBy].order)
                setStateObjectKeys(sortedKeys)
            }
            setSortBy(sortBy)
        } else {
            if(isEmpty(selectedDistrict)) {
                let sortedKeys = Object.keys(stateDataObject?.dates)
                setStateObjectKeys(sortedKeys)
                setSortBy(sortBy)
            } else {
                setSortBy(sortBy)
            }
        }
    }

    const onSelectDistrict = (event) => {
        let district = event.target.value;
        let tableData = {}
        if(!isEmpty(district)) {
            tableData = props?.state?.getDistrictDataByName(district) ? props?.state?.getDistrictDataByName(district) : {}
            let sortedKeys = tableData ? Object.keys(tableData) : []
            setStateObjectKeys(sortedKeys)
        } else {
            if(isEmpty(sortBy)) {
                let sortedKeys = Object.keys(stateDataObject?.dates)
                setStateObjectKeys(sortedKeys)
            } else {
                let sortedKeys = sortByOrderObject(stateData?.dates, SORT_FILTER[sortBy].key, SORT_FILTER[sortBy].order)
                setStateObjectKeys(sortedKeys)
            }
        }
        setSelectedDistrict(district)
    }

    const onClearFilter = () => {
        if(!isEmpty(dateFilter) || !isEmpty(sortBy) || !isEmpty(selectedDistrict)){
            let sortedKeys = Object.keys(stateDataObject?.dates)
            setStateObjectKeys(sortedKeys)
            setDateFilter('')
            setItemToLocal(DETAIL_DATE_LOCAL_KEY, '')
            setSortBy('')
            setItemToLocal(DETAIL_SORTBY_LOCAL_KEY, '')
            setSelectedDistrict('')
        }
    }

    return(
        <div className='container'>
            <div className='filter_container'>
                <h6 className='filter_title'>{stateData?.getStateName()}</h6>
                <DatePicker id="detail_date_filter" type={"date"} className='district_date_filter' name={'date_filter'} dateFilter={dateFilter} onChangeDate={onChangeDate} />
                <SortBy id="sortBy" className='sortby_filter' name={"sortBy"} sortByList={SORT_BY_LIST} placeholder='Sort By' sortBy={sortBy} onChange={onChangeSortBy} />
                <SortBy id="detail_select_district" className='district_select_district' name={"detail_select_district"} sortByList={stateData?.districtsList} placeholder='Select District' sortBy={selectedDistrict} onChange={onSelectDistrict} />
                <span className='clear_filter' onClick={onClearFilter}>{'clear filters'}</span>
            </div>
            <div className='table_container'>
                <table>
                    <thead>
                        <tr>
                            <th>{'Date'}</th>
                            <th>{'Confirmed'}</th>
                            <th>{'Recovered'}</th>
                            <th>{'Deceased'}</th>
                            <th>{'Delta'}</th>
                            <th>{'Delta 7'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterDataCallback()?.map((date, index) => {
                                return (
                                    <tr key={`date_rows_${index}`}>
                                        <td>{date}</td>
                                        <td>{stateData?.dates[date]?.total.confirmed}</td>
                                        <td>{stateData?.dates[date]?.total.recovered}</td>
                                        <td>{stateData?.dates[date]?.total.deceased}</td>
                                        <td>
                                            <div className='card_flex'>
                                                <p style={{width: '50%'}}>{'Confirmed'}</p>
                                                <p style={{width: '5%'}}>-</p>
                                                <p style={{width: '30%'}}>{stateData?.dates[date]?.delta.confirmed}</p>
                                            </div>
                                            <div className='card_flex'>
                                                <p style={{width: '50%'}}>{'Recovered'}</p>
                                                <p style={{width: '5%'}}>-</p>
                                                <p style={{width: '30%'}}>{stateData?.dates[date]?.delta.recovered}</p>
                                            </div>
                                            <div className='card_flex'>
                                                <p style={{width: '50%'}}>{'Deceased'}</p>
                                                <p style={{width: '5%'}}>-</p>
                                                <p style={{width: '30%'}}>{stateData?.dates[date]?.delta.deceased}</p>
                                            </div>
                                        </td>
                                        <td>
                                        <div className='card_flex'>
                                                <p style={{width: '50%'}}>{'Confirmed'}</p>
                                                <p style={{width: '5%'}}>-</p>
                                                <p style={{width: '30%'}}>{stateData?.dates[date]?.delta7.confirmed}</p>
                                            </div>
                                            <div className='card_flex'>
                                                <p style={{width: '50%'}}>{'Recovered'}</p>
                                                <p style={{width: '5%'}}>-</p>
                                                <p style={{width: '30%'}}>{stateData?.dates[date]?.delta7.recovered}</p>
                                            </div>
                                            <div className='card_flex'>
                                                <p style={{width: '50%'}}>{'Deceased'}</p>
                                                <p style={{width: '5%'}}>-</p>
                                                <p style={{width: '30%'}}>{stateData?.dates[date]?.delta7.deceased}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            filterDataCallback().length === 0 && 
                            <tr>
                                <td colSpan={6}>
                                    {NO_RESULTS_FOUND}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DetailScreen;
