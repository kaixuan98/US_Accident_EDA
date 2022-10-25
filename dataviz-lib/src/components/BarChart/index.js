import React from 'react'
import Bars from './Bars'
import BottomAxis from './BottomAxis'
import LeftAxis from './LeftAxis'
import * as d3 from "d3";


const index = ({data , xValue, yValue, innerWidth, innerHeight, showLeftAxis, isFormat, formatValue}) => {

    // creation of scale
    const xScale = d3.scaleBand().domain(data.map(xValue)).range([0,innerWidth]).paddingInner(0);
    const yScale = d3.scaleLinear().domain([0,d3.max(data,yValue)]).range([innerHeight,0]);

    return (
        <g>
            {
                showLeftAxis? (
                    <LeftAxis
                        yScale={yScale}
                        innerWidth={innerWidth}
                    ></LeftAxis>
                ):(null)
            }
            <BottomAxis xScale={xScale} innerHeight={innerHeight} isFormat={isFormat} formatValue={formatValue}></BottomAxis>
            <Bars 
                data ={data}
                xScale ={xScale}
                xValue ={xValue}
                yScale = {yScale}
                yValue = {yValue}
                innerHeight ={innerHeight}
                showLeftAxis={showLeftAxis}
            ></Bars>
        </g>
    )
}

export default index