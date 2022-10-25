import React, {useEffect, useRef, useState} from 'react'
import NavBar from '../../components/nav/NavBar'
import '../../styles/common.scss'
import style from '../question2/q2Style.module.scss';
import * as d3 from "d3";
import yearlyCount from './data/yearly_accident.csv';
import useWindowSize from '../../hooks/useWindowSize'
import { motion } from "framer-motion"
import description from './description'


const Question2 = ({pageVariants, pageTransition}) => {
    
    // set the graph size 
    const size = useWindowSize();
    const width = size.width;
    const height = size.height;
    const margin = { top: 30, right: 200, bottom: 200, left: 200 }
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

    // ref for svg
    let ref = useRef(null);

    // data 
    const [data, setData] = useState(null);

    useEffect(() => {
        d3.csv(yearlyCount).then(setData);
    }, [])

    if (!data) {
        return (<pre>Loading Data...</pre>);
    }

    const xValue = d => d.Year;
    const yValue = d => parseInt(d.Count);

    const xScale = d3.scaleBand().domain(data.map(xValue)).range([0,innerWidth]);
    const yScale = d3.scaleLinear().domain([0,d3.max(data,yValue)]).range([innerHeight,0]).clamp(true);

    return (
        <>
            <motion.div
            className='bg page'
            initial='initial'
            animate='in'
            exit='out'
            variants={pageVariants}
            transition={pageTransition}
            >
            <NavBar currentPage={3}  nextPageLink={"question3"} prevPageLink={"question1"}></NavBar>
            <div className={style.content}>
                <h1 className='headline'>Yearly Breakdown Number of Accident</h1>
                <div className='graph'>
                    <svg ref={ref} width={width} height={height}>
                        <g transform={`translate(${margin.left},${margin.top})`}>
                            {/* Bottom Axis */}
                            <g>
                                {xScale.domain().map(tickValue => (
                                    <text
                                        x={xScale(tickValue) + xScale.bandwidth()/3}
                                        y={innerHeight + 20 }
                                        textAnchor='middle'
                                        className={style.monthTicks}
                                    > 
                                        {tickValue}
                                    </text>
                                ))}
                            </g>
                            {/* bars */}
                            {
                                data.map(d => (
                                    <g className='barsContainer'>
                                        <motion.text
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 3 }}
                                            x={xScale(xValue(d)) + xScale.bandwidth()/3}
                                            y={yScale(yValue(d)) - 5 }
                                            textAnchor='middle'
                                            className='valueCounts'
                                        >
                                            {Math.floor(yValue(d) / 100) / 10.0 + "k"}
                                        </motion.text>
                                        <motion.rect 
                                            initial={{ y: innerHeight , height: 0}}
                                            animate={{ y: yScale(yValue(d)), height: innerHeight - yScale(yValue(d)) }}
                                            transition={{ delay: 2, duration: 1.5}}
                                            className={style.mark}
                                            key={yValue(d)}
                                            x={xScale(xValue(d))}
                                            width={xScale.bandwidth()/3 * 2}
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
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 , delay: 1}}
                        className={style.descb}
                        textLength={500}
                    >
                        <p>
                            {description.page1}
                            <br></br>
                            <br></br>
                            <a href="https://www.vox.com/22675358/us-car-deaths-year-traffic-covid-pandemic">Vox<sup>[1]</sup></a>
                            <a href="https://www.nytimes.com/2022/02/15/briefing/vehicle-crashes-deaths-pandemic.html">NYT<sup>[2]</sup> </a>
                        </p>
                        
                    </motion.div>  
                </div>
            </div>
            </motion.div>

        </>

    )
}

export default Question2