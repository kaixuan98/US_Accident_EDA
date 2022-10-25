import React from 'react'
import { motion } from "framer-motion"
import style from '../BarChart/barchartStyle.module.scss'

const Bars = ({data, xScale, xValue, yScale, yValue, innerHeight, showLeftAxis}) => {
  return (
    <>
    {
      data.map(d => (
          <g className='barsContainer' >
            {
              !showLeftAxis? (
                <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2}}
                    x={xScale(xValue(d)) + xScale.bandwidth()/3}
                    y={yScale(yValue(d)) - 5 }
                    textAnchor='middle'
                    className={style.valueCounts}
                >
                    {Math.floor(yValue(d) / 100) / 10.0 + "k"}
                </motion.text>
              ):(null)
            }
              <motion.rect 
                  initial={{ y: innerHeight , height: 0}}
                  animate={{ y: yScale(yValue(d)), height: innerHeight - yScale(yValue(d)) }}
                  transition={{ delay: 1, duration: 1.5}}
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
    
    </>
  )
}

export default Bars