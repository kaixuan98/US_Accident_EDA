import React , {useEffect, useRef, useState} from 'react'
import NavBar from '../../components/nav/NavBar'
import Button from '../../components/button/Button'
import '../../styles/common.scss'
import style from './q3Style.module.scss'
import * as d3 from "d3";
import states_year_count from './data/states_year_count_long.csv';
import * as topojson from "topojson-client";
import UsMap from '../../components/UsMap'
import useWindowSize from '../../hooks/useWindowSize'
import {motion} from 'framer-motion'


const Question2 = ({pageVariants, pageTransition}) => {
    const size = useWindowSize();
    const width = size.width;
    const height = size.height;
    const margin = { top: 100, right: 100, bottom: 100, left: 100}

    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

    const years = [ '2016' , '2017', '2018', '2019', '2020', '2021']

    let ref = useRef(null)

    const jsonUrl = 'https://unpkg.com/us-atlas@3.0.0/states-10m.json';  // the topo file that we need

    // load data 
    const [data, setData] = useState(null);
    const [usMap, setMap] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [activeYear, setYear] = useState('2016');
    
    useEffect(() => {
        d3.csv(states_year_count).then(setData);
        d3.csv(states_year_count).then(d => {
          const newItem = d.filter( newVal => {return newVal.Year === '2016'})
          setFilterData(newItem);
        });
        d3.json(jsonUrl).then(topodata => {
          const states = topojson.feature(topodata, topodata.objects.states);
          setMap(states.features);
        });
    }, [])

    if (!data || !usMap) {
        return <pre>Loading Data ...</pre>;
    }

    const filterItem = (currYear) => {
      const newItem = data.filter((newVal) => {
        return newVal.Year === currYear;
      });
      setFilterData(newItem);
    };

    function activeButton(value){
      setYear(value)
    }

    const colorValue = d => parseInt(d.Year_Count);
    const colorScale =  d3.scaleQuantile().domain([0, d3.max(filterData, colorValue)]).range(['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d']);

  return (
    <motion.div 
      className='bg page'
      initial='initial'
      animate='in'
      exit='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <NavBar currentPage={4}  nextPageLink={"question3"} prevPageLink={"question2"}></NavBar>
      <div className={style.content}>
          <h1 className='headline'>Year-by-Year Number of Accident in each State</h1>
          <div className={style.yearList}>
            {
              years.map( y => (
                <Button 
                  text={y} 
                  handleClick={filterItem} 
                  onChange={activeButton} 
                  currentVal={activeYear} 
                  key={y}
                ></Button>
              ))
            }
          </div> 
          {/* add in the total count here and the percentage increase from previous years */}
          <div className='graph'>
            <svg ref={ref} width={width} height={height}>
              <UsMap 
                UsAtlas={usMap}
                isOutline={false}
                marksData={filterData}
                data={data}
                width={innerWidth}
                colorScale={colorScale}
                colorValue={colorValue}
                cx={innerWidth/2}
                cy={innerHeight/2}
              ></UsMap>
                {/* the comparison of data with previous year */}

              <g>
                {/* use index - 2016 as base year 100%, as years increase, the percentages increases */}
                <text></text>
              </g>
              <g></g>
            </svg>
          </div>
      </div>
    </motion.div>
  )
}

export default Question2