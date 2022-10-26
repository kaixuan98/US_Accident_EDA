import './App.css';
import Intro from './pages/intro/Intro';
import {Route, Routes, useLocation} from 'react-router-dom'
import Question1 from './pages/question1/Question1';
import Question2 from './pages/question2/Question2';
import Question3 from './pages/question3/Question3';
import Question4 from './pages/question4/Question4';
import Question5 from './pages/question5/Question5';
import Question6 from './pages/question6/Question6';
import {AnimatePresence} from "framer-motion"


function App() {
  const loc = useLocation(); 

  const pageVariants = {
    initial:{
      opacity: 0,
      x:"-100vw"
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      x:"100vw"
    }
  }

  const pageTransition = {
    type:'tween',
    ease:'anticipate',
    duration: 1.5,

  }

  return (
    <div className="App" style={{position: 'relative'}}>
      <AnimatePresence>
        <Routes location={loc} key={loc.pathname}>
          <Route exact path='/' element={<Intro pageVariants={pageVariants} pageTransition={pageTransition}/>}></Route>
          <Route exact path='/question1' element={<Question1 pageVariants={pageVariants} pageTransition={pageTransition}/>}></Route>
          <Route exact path='/question2' element={<Question2 pageVariants={pageVariants} pageTransition={pageTransition}/>}></Route>
          <Route exact path='/question3' element={<Question3 pageVariants={pageVariants} pageTransition={pageTransition}/>}></Route>
          <Route exact path='/question4' element={<Question4 pageVariants={pageVariants} pageTransition={pageTransition}/>}></Route>
          <Route exact path='/question5' element={<Question5 pageVariants={pageVariants} pageTransition={pageTransition}/>}></Route>
          <Route exact path='/question6' element={<Question6 pageVariants={pageVariants} pageTransition={pageTransition}/>}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
