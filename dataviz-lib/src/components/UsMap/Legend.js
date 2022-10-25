import React from 'react'

const Legend = ({colorScale, width}) => {
    return (
        <g className='legend'>
                {colorScale.quantiles().map( (q, i) => {
                    return <g key={i} transform={`translate(${width},${(i+1)*30})`}> <rect width={20} height={20} fill={colorScale(q)}></rect> <text x={100} y={15} text-anchor="end">&#8804; {Math.ceil(q)}</text></g>
                })}
        </g>
    )
}

export default Legend