import React, {useRef, useEffect, useState} from 'react'
import * as d3 from "d3";
import NavBar from '../../components/nav/NavBar';
import '../../styles/common.scss';
import style from '../question5/q5Style.module.scss';
import weather_conditions from '../question5/data/weather_conditions.csv'
import useWindowSize from '../../hooks/useWindowSize'
import { motion } from "framer-motion"
import description from './description'

/**
 * Question 5: Hourly Number of accident
 * 
 */

const siFormat = d3.format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue) ;

const Question5 = ({pageVariants, pageTransition}) => {

    const size = useWindowSize();

    // set the graph size 
    const width = size.width;
    const height = size.height;

    const margin = { top: 30, right: 200, bottom: 200, left: 200 }

    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;


    let ref = useRef(null)

    const [data, setData] = useState(null)

    useEffect(() => {
        d3.csv(weather_conditions).then(setData);
    }, [])

    if(!data){
        return <pre>Loading Data...</pre>
    }

    const yValue = d => d.Weather_Condition
    const xValue = d => parseInt(d.Weather_Counts)

    const xScale = d3.scaleLinear().domain([0, d3.max(data,xValue)]).range([0, innerWidth]).clamp(true);
    const yScale = d3.scaleBand().domain(data.map(yValue)).range([0, innerHeight]).paddingInner(0.15);

    return (
        <motion.div 
            className='bg page'
            initial='initial'
            animate='in'
            exit='out'
            variants={pageVariants}
            transition={pageTransition}
        >
            <NavBar currentPage={6}  nextPageLink={"question6"} prevPageLink={"question4"}></NavBar>
            <div className='content'>
                <h1 className='headline'>Weather Conditions during Accidents</h1>
                <div className='graph'>
                    <svg ref={ref} width={width} height={height}>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                            {/* bottom axis */}
                            {
                                xScale.ticks().map( tickValue => (
                                    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
                                        <line className={style.line} y2={innerHeight}/>
                                        <text className={style.tickLabel} text-anchor="middle" dy='0.71em' y={innerHeight + 3}>{xAxisTickFormat(tickValue)}</text>
                                    </g>
                                ))
                                    
                            }
                            {/* the left axis */}
                            {
                                yScale.domain().map( tickValue => (
                                    <g className={style.tick} key={tickValue}>
                                        <text textAnchor='end' x={-5}  y={yScale(tickValue) + yScale.bandwidth()/2}>{tickValue}</text>
                                    </g>
                                ))
                            }
                            {/* the bars */}
                            {
                                data.map(d => (
                                    <g className='barsContainer'>
                                        <motion.rect
                                            initial={{ width: 0}}
                                            animate={{ width : xScale(xValue(d)) }}
                                            transition={{ duration: 1.5, delay: 2}}
                                            className="mark"
                                            key={yValue(d)}
                                            x={0}
                                            y={yScale(yValue(d)) + yScale.bandwidth()/6}
                                            height={yScale.bandwidth()/2}
                                            rx={2}
                                        >
                                            <title>{xValue(d)}</title>
                                        </motion.rect>
                                    </g>
                                ))
                            }
                        </g>
                    </svg>
                    <motion.div 
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 , delay: 1}}
                        className={style.descb}
                        textLength={500}
                    >
                        <p>
                            {description.page1}
                        </p>
                        
                    </motion.div>  
                </div>
            </div>
    </motion.div>
        
    )
}

export default Question5