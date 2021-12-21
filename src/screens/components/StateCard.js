import React, { useEffect, useState } from 'react';
import './StateCard.css'
import LeftArrow from '../../assets/images/Left_Arrow.svg'
import RightArrow from '../../assets/images/Right_Arrow.svg'
import SortBy from './SortBy';
import { STATE_LIST } from '../utils/constants';

const StateCard = (props) => {

    const[activeSlide, setActiveSlide] = useState(0)
    const[slideLength, setSlideLength] = useState(0)
    const[selectedDistrict, setSelectedDistrict] = useState('')
    const[cardData, setCardData] = useState({})


    useEffect(() => {
        setCardData(props?.state)
        setSlideLength(props?.state?.slideList?.length)
    }, [props?.state])

    const onSelectDistrict = (event) => {
        let district = event.target.value;
        let cardData = {}
        if(district !== '') {
            cardData = props?.state?.getDistrictDataByName(district)
        } else {
            cardData = props?.state
        }
        setCardData(cardData)
        setSelectedDistrict(district)
    }

    const onClickNext = (e) => {
        if(activeSlide < slideLength){
            setActiveSlide(activeSlide + 1)
            const slider = document.getElementById(`#card_slider_${props.index}`);
            slider.style.transform = `translate(-${100 * (activeSlide + 1)}%)`;
        }
        
    }

    const onClickPrev = (e) => {
        if(activeSlide !==0){
            setActiveSlide(activeSlide - 1)
            const slider = document.getElementById(`#card_slider_${props.index}`);
            slider.style.transform = `translate(-${100 * (activeSlide - 1)}%)`;
        }
    }

    const onClickCard = (event, state) => {
        props.onClick(state)
    }

    return (
        <div className='card'>
            <div className='card_header'>
                <div className='card_header_flex'>
                    <h4 onClick={(e) => onClickCard(e, props.state)}>{STATE_LIST[props?.state.name] ? STATE_LIST[props?.state.name] : props?.state.name}</h4>
                    <SortBy id="select_district" className='select_district' name={"select_district"} sortByList={props.state?.districtsList} placeholder='Select District' sortBy={selectedDistrict} onChange={onSelectDistrict} />
                </div>
            </div>
            {
                activeSlide > 0 &&
                <div style={{width: 30, height: 30, position: 'absolute', left: 10, bottom: 0, top: '50%', cursor: 'pointer', zIndex: 9}} onClick={onClickPrev}>
                    <img src={LeftArrow} alt="Prev" width="30" height="30" />
                </div>

            }
            {
                activeSlide < slideLength - 1 &&
                <div style={{width: 30, height: 30, position: 'absolute', right: 10,  bottom: 0, top: '50%', cursor: 'pointer', zIndex: 9}} onClick={onClickNext}>
                    <img src={RightArrow} alt="Next" width="30" height="30" />
                </div>

            }
            <div id={`#card_slider_${props.index}`} style={{width: '100%', display: 'flex', flexDirection: 'row', transition: '0.1s'}} onClick={(e) => onClickCard(e, props.state)}>
                {props.state?.slideList?.map((slide, index) => {
                    return (
                        <div key={`slide_${index}`} style={{width: '100%', flexShrink: 0, flexBasis: '100%'}}>
                            <div className='card_header_flex'>
                                <div className='card_flex'>
                                    <h5>{cardData[slide]?.name}</h5>
                                </div>
                            </div>
                            <div className='card_body'>
                                <div className='card_data'>
                                    <div className='card_flex'>
                                        <p style={{width: '30%'}}>{'Confirmed'}</p>
                                        <p style={{width: '5%'}}>:</p>
                                        <p style={{width: '30%'}}>{cardData[slide]?.confirmed}</p>
                                    </div>
                                    <div className='card_flex'>
                                        <p style={{width: '30%'}}>{'Recovered'}</p>
                                        <p style={{width: '5%'}}>:</p>
                                        <p style={{width: '30%'}}>{cardData[slide]?.recovered}</p>
                                    </div>
                                    <div className='card_flex'>
                                        <p style={{width: '30%'}}>{'Deceased'}</p>
                                        <p style={{width: '5%'}}>:</p>
                                        <p style={{width: '30%'}}>{cardData[slide]?.deceased}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StateCard;