import React, {useRef} from 'react'

const Lolipop = ({dimensions, data}) => {

    const ref = useRef(null);


    return (
        <svg ref={ref}></svg>
    )
}

export default Lolipop