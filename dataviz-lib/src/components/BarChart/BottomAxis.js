import React from 'react'
import style from '../BarChart/barchartStyle.module.scss'

const BottomAxis = ({xScale, innerHeight,formatValue, isFormat}) => {
  return (
    <>
      {
        xScale.domain().map( tickValue=> (
            <text
                x={xScale(tickValue) + xScale.bandwidth()/3}
                y={innerHeight + 20 }
                textAnchor='middle'
                className={style.bottomTicks}
            > 
                {isFormat? (formatValue(tickValue)): (tickValue)}
            </text>
        ))
      }
    </>
    
  )
}

export default BottomAxis