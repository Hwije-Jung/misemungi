import React from 'react';
import './nav.css'
import changwon from '../changwon.gif'

class nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
    
           <nav className="nav">
                    <img src={changwon} width='195' height='35'></img>
                    <span className='nav_text'>소프트웨어 공학_B조</span>
          </nav>
        );
    }
}

export default nav;