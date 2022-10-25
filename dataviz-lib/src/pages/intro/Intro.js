import React,{useEffect} from 'react'
import style from './introStyles.module.scss'; 
import '../../styles/common.scss'
import Button from '../../components/button/Button';
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

const Intro = ({pageVariants, pageTransition}) => {

    useEffect(() => {
        document.title = "US Accident EDA";  
    }, []);

    return (
        <motion.div 
            className={`bg page ${style.fullPage}`}
            initial='initial'
            animate='in'
            exit='out'
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className={style.content}>
                <h1 className='headline'>US Accident</h1>
                <h3 className='subtitle'>2016 to 2021</h3>
                <p className='body'>By Kai Xuan Chin</p>
                <Link to='/question1'> <Button text={"Let's Start"} ></Button> </Link>
            </div>
            <div className={`${style.footer}  caption`}>
                <p>Data : 
                    Moosavi, Sobhan, Mohammad Hossein Samavatian, Srinivasan Parthasarathy, and Rajiv Ramnath. 
                    “A Countrywide Traffic Accident Dataset.”, 2019 
                    <a href='https://www.kaggle.com/datasets/sobhanmoosavi/us-accidents'>(Kaggle)</a>
                </p>
            </div>
        </motion.div>
    )
}

export default Intro