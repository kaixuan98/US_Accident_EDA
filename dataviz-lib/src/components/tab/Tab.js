import React, {useState} from 'react'
import { Link } from "react-router-dom";
import './tab.scss'

const Tab = ({page, tabWidth, activeTab}) => {

    const [tabHeight, setTabHeight] = useState(10)
    const [isShown, setIsShown] = useState(false)

    const handleMouseIn = () =>  {
        setIsShown(true);
        setTabHeight(20);
    }

    const handleMouseOut = () => {
        setIsShown(false);
        setTabHeight(10);
    }

    return (
        <div className='tabs-container'>
            {
                activeTab? (
                    <Link to={`/${page}`}>
                        <div 
                            style={{width: tabWidth, height: tabHeight }} 
                            className='tab-content' 
                            onMouseEnter={handleMouseIn}
                            onMouseLeave={handleMouseOut}
                        >
                            {isShown? page: ''}
                        </div>
                    </Link>
                ):(
                    <div 
                        style={{width: tabWidth, height: 10 }} 
                        className='active-tab' 
                    >
                    </div>
                )
            }
        </div>
    )
}

export default Tab