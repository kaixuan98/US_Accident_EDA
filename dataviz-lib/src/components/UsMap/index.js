import React from 'react'
import * as d3 from "d3";
import style from '../../pages/question3/q3Style.module.scss';
import Legend from './Legend';
import Mark from './Mark';

/**
 * This can help to draw two type of maps, maps that with fill (mainly for population or counts) and maps with a point on top if given coordinates
 * Props: 
 * 1. USAtlas - us map data topoJson data
 * 2. isOutline - true or false 
 * 3. markData - filter data if there is a filter option
 * 4. data - the whole data
 * 5. colorScale - for scale on the map
 * 6. colorValue(function) 
 * 7. width 
 * 
 */

const UsMap= ({UsAtlas, isOutline, marksData, data, width, colorScale, colorValue, cx, cy }) => {

    const projection = d3.geoAlbersUsa().scale(800).translate([cx,cy])
    const pathGenerator = d3.geoPath().projection(projection);

    // need to combine the data and map data 
    const rowByState = new Map();
    marksData.forEach(d => {
        rowByState.set(d.State_Name, d);
    });

    const missingDataColor = 'white';


    return (
        <>
        {
            isOutline? (
                <>
                    <g className='usmap'>
                        {
                            UsAtlas.map(feature => {
                                return <path fill='#D4d4d4' d={pathGenerator(feature)} className={style.state}></path>
                            })
                        }
                    </g>
                    <Mark data={data} projection={projection} radius={5}></Mark>
                </>
            )
            : (
                <>
                    <g className='usmap'>
                        {
                            UsAtlas.map( feature => {
                                const d = rowByState.get(feature.properties.name);
                                return <path fill={d ? colorScale(colorValue(d)) : missingDataColor} d={pathGenerator(feature)} className={style.state}><title>{colorValue}</title></path>
                            })
                        }
                    </g>
                    <Legend colorScale={colorScale} width={width - (width/10)}></Legend>
                </>

            )
        }
        </>
        
    )
}

export default UsMap