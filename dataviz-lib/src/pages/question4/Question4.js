import React, {useRef, useEffect, useState} from 'react'
import * as d3 from "d3";
import NavBar from '../../components/nav/NavBar';
import BarChart from '../../components/BarChart/index'
import monthly_accident from '../question4/data/monthly_accident.csv';
import weekly_accident from '../question4/data/weekly_accident.csv';
import hourly_accident from '../question4/data/daily_accident.csv';
import '../../styles/common.scss';
import style from '../question4/q4Style.module.scss';
import useWindowSize from '../../hooks/useWindowSize'
import { motion } from "framer-motion"
import Button from '../../components/button/Button';
import description from './description'




/**
 * Question 4: Monthly Number of accident
 * 
 */

const Question4 = ({pageVariants, pageTransition}) => {

    const size = useWindowSize();

    // set the graph size 
    const width = size.width;
    const height = size.height;
    const margin = { top: 100, right: 100, bottom: 200, left: 100}

    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

    let ref = useRef(null)

    const modes = ['Monthly', 'Weekly', 'Hourly'];
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec']
    const weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const [monthly, setMonthly] = useState(null);
    const [weekly, setWeekly] = useState(null);
    const [hourly, setHourly] = useState(null);
    const [selectedMode, setSelectedMode] = useState('Monthly');

    useEffect(() => {
        d3.csv(monthly_accident).then(setMonthly);
        d3.csv(weekly_accident).then(setWeekly);
        d3.csv(hourly_accident).then(setHourly);
    }, [])

    if(!monthly && !weekly && !hourly){
        return <pre>Loading Data...</pre>
    }

    function activeButton(value){
        setSelectedMode(value)
    }

    // monthly 
    const xMValue = d => d.Month
    const yMValue = d => parseInt(d.Monthly_Count)
    const monthValue = d => monthList[d -1] 

    //weekly 
    const xWValue = d => d.Day
    const yWValue = d => parseInt(d.Count)
    const weekValue = d => weekList[d]

    //hourly
    const xHValue = d => d.Hours
    const yHValue = d => parseInt(d.Hourly_Count)


    return (
        <motion.div 
            className='bg page'
            initial='initial'
            animate='in'
            exit='out'
            variants={pageVariants}
            transition={pageTransition}
        >
            <NavBar currentPage={5}  nextPageLink={"question5"} prevPageLink={"question3"}></NavBar>
            <div className='content'>
                <h1 className='headline'>Time Analysis on The Accidents</h1>
                {
                    modes.map( m => ( <Button text={m} handleClick={setSelectedMode} onChange={activeButton} currentVal={selectedMode} >{m}</Button>))
                }
                <div className='graph'>
                    <svg ref={ref} width={width} height={height}>
                        <g transform={`translate(${margin.left},50)`}>
                            {
                                ( () => {
                                    switch (selectedMode){
                                        case 'Monthly':
                                            return <BarChart 
                                                        data={monthly} 
                                                        xValue={xMValue} 
                                                        yValue={yMValue} 
                                                        innerWidth={innerWidth} 
                                                        innerHeight={innerHeight} 
                                                        showLeftAxis={false}
                                                        isFormat={true}
                                                        formatValue={monthValue}
                                                    />
                                        case 'Weekly':
                                            return <BarChart 
                                                        data={weekly} 
                                                        xValue={xWValue} 
                                                        yValue={yWValue} 
                                                        innerWidth={innerWidth} 
                                                        innerHeight={innerHeight} 
                                                        showLeftAxis={false}
                                                        isFormat={true}
                                                        formatValue={weekValue}
                                                    />
                                        case 'Hourly':
                                            return <BarChart 
                                                        data={hourly} 
                                                        xValue={xHValue} 
                                                        yValue={yHValue} 
                                                        innerWidth={innerWidth} 
                                                        innerHeight={innerHeight} 
                                                        showLeftAxis={true}
                                                        isFormat={false}
                                                    />
                                        default:
                                            return null

                                    }
                                }) ()
                            }
                        </g>
                    </svg>
                    {
                        ( () => {
                            switch (selectedMode){
                                case 'Monthly':
                                    return (<motion.div 
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5}}
                                    className={style.descb}
                                    textLength={300}
                                    style={{ top: '25%' , left: '10%' }}
                                >
                                    <p>
                                        {description.monthly.text}
                                    </p>   
                                </motion.div> ) 
                                case 'Weekly':
                                    return (<motion.div 
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className={style.descb}
                                        textLength={500}
                                        style={{ top: '20%' , left: '70%' }}
                                    >
                                        <p>
                                            {description.weekly.text}
                                        </p>   
                                    </motion.div> ) 
                                case 'Hourly':
                                    return (<motion.div 
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5}}
                                        className={style.descb}
                                        textLength={500}
                                        style={{ top: '25%' , left: '10%' }}
                                    >
                                        <p>
                                            {description.hourly.text}
                                        </p>   
                                    </motion.div> ) 
                                default:
                                    return null

                            }
                        }) ()
                    }
                </div>
            </div>
    </motion.div>
        
    )
}

export default Question4