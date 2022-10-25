import React from 'react'

const Mark = ({data, projection, radius }) => {
    return (
        <g className='marks'>
        {
            data.map( d => {
                const [x, y] = projection([d.Start_Lng, d.Start_Lat]);
                    return( 
                            <circle 
                                className="points" 
                                cx={x} cy={y} 
                                r={radius} 
                                fill={'black'}
                            >
                                <title></title>
                            </circle>
                        )
            })
        }
    </g>
    )
}

export default Mark