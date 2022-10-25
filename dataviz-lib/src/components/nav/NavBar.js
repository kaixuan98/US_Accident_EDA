import React from 'react'
import style from '../nav/navStyle.module.scss'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Tab from '../tab/Tab';
import useWindowSize from '../../hooks/useWindowSize'


const NavBar = ({currentPage, nextPageLink, prevPageLink}) => {

    const pageLinks = ['', 'question1', 'question2', 'question3', 'question4', 'question5', 'question6'] ; // input for list of pageLinks
    const size= useWindowSize();
    const tabWidth = (size.width - 20)/(pageLinks.length)

    return (
        <div className={style.nav}>
            <div className={style.navContainer}>
                <div className={style.pageCountContainer}>
                        <Link to={`/${prevPageLink}`}><span className={style.leftArrow}><MdKeyboardArrowLeft size={32}/></span></Link>
                        <p><span className={style.pages}> {currentPage} of 10 </span></p>
                        <Link to={`/${nextPageLink}`}><span className={style.rightArrow}><MdKeyboardArrowRight size={32}/></span></Link>
                </div>
            </div>
            <div className={style.tabsContainer}>
                {
                    pageLinks.map( (page, index) => ( 
                        <Tab page={page} tabWidth={tabWidth} activeTab={ currentPage === index+1? '': currentPage}></Tab>
                    ))
                }
            </div>
        </div>
    )
}

export default NavBar