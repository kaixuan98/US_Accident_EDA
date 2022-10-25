import React from 'react'
import style from '../BarChart/barchartStyle.module.scss'

const LeftAxis = ({yScale, innerWidth}) => {
  return (
    <>
      {
        yScale.ticks().map( tickValue => (
            <g>

                <text
                    x={-50}
                    y={yScale(tickValue)}
                    textAnchor='middle'
                    className={style.yTicks}
                >
                    {Math.floor(tickValue / 100) / 10.0 + "k"}
                </text>
                <line
                    x1={0}
                    y1={yScale(tickValue)}
                    x2={innerWidth}
                    y2={yScale(tickValue)}
                    className={style.gridLines}
                ></line>
            </g>
        ))
      }
    </>
  )
}

export default LeftAxis