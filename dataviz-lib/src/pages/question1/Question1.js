import React, {useEffect, useRef, useState} from 'react'
import NavBar from '../../components/nav/NavBar'
import '../../styles/common.scss'
import style from '../question1/q1Style.module.scss';
import * as d3 from "d3";
import accidentCount from './data/accident_counts.csv';
import useWindowSize from '../../hooks/useWindowSize'
import { motion } from "framer-motion"


// set the scale for the graph
const xValue = d => d.Count;
const yValue = d => d.State_Name;

const siFormat = d3.format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue) ;

const Question1 = ({pageVariants, pageTransition}) => {

    const size = useWindowSize();

    // set the graph size 
    const width = size.width;
    const height = size.height;

    const margin = { top: 30, right: 200, bottom: 200, left: 200 }

    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

    let ref = useRef(null)

    // load data 
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
            d.Count = parseInt(d.Count);
            return d;
        };
        d3.csv(accidentCount,row).then(data => {
            setData(data.slice(0, 10))});
    }, [])

    if (!data) {
        return (<pre>Loading Data...</pre>);
    }

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
            <NavBar currentPage={2}  nextPageLink={"question2"} prevPageLink={"intro"}></NavBar>
            <div className={style.content}>
                <h1 className='headline'>The 10 most accident-prone states between 2016 to 2021</h1>
                <div className='graph'>
                    <svg ref={ref} width={width} height={height}>
                        <g transform={`translate(${margin.left},${margin.top})`}>
                            {/* the bottom axis  */}
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
                                        {/* <FaCarSide x={xScale(xValue(d)) - 3} y={yScale(yValue(d)) - 5 } size={30}/>3 */}
                                    </g>
                                ))
                            }
                        </g>
                    </svg>
                </div>
            </div>
        </motion.div>

    )
}

export default Question1