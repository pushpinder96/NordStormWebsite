
import '../../../../node_modules/antd/dist/antd.css';
import '../responsive header/responsive.css';
import React from 'react';
import { Keyframes, animated } from 'react-spring/renderprops';
import {Form} from 'antd';
import { Link } from 'react-router-dom';

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  
  peek: [{ x: 0, from: { x: -100 }, delay: 500 }, { x: -100, delay: 800 }],
  
  open: { delay: 0, x: 0 },
  // or async functions with side-effects
  close: async call => {
  //  await delay(400);
    await call({ delay: 0, x: -100 })
  },
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
  peek: [
    { x: 0, opacity: 1, from: { x: -100, opacity: 0 }, delay: 600 },
    { x: -100, opacity: 0, delay: 0 },
  ],
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: -100, opacity: 0, delay: 0 },
})

const items = [
  <Link to='/'
   style={{textDecoration: 'none',color:'inherit'}}>Home 
   </Link>,
    <Link to='/casual'
    style={{textDecoration: 'none',color:'inherit'}}>Casual
  </Link>,
  <Link to='/sport'
  style={{textDecoration: 'none',color:'inherit'}}>Sports
   </Link>,
   <Link to='/contact'
   style={{textDecoration: 'none',color:'inherit'}}>Contact
    </Link>
]

export default class App extends React.Component {
  state = { open: undefined,NameClass:'modalOpen' }
  
  toggle = () =>{ 
    this.setState(state => ({ open: !state.open }));   
 }
 
  render() {
    const state =
    this.state.open
        ? 'open'
        : 'close';
    const icon = this.state.open ? 'fold' : 'unfold'
    return (
      <div style={{ width: '100%', height: '100%' }}>
    
    <span 
    style ={{fontSize:'40px',position:'relative',top:'30%'}}
    class="material-icons hello"
    type={`menu-${icon}`}
    sidebarclass="sidebar-toggle"
    onClick={this.toggle}>
    menu_open
    </span>

    <animated.div 
    onClick={this.toggle} 
    className={this.state.open==!state.open?'modalClose':'modalOpen'}  >

    </animated.div>
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div

              className="sidebar"
              style={{
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                width: '60%', height: '500px',
                position:'absolute',top:'100%',left:'0',
                backgroundColor:'black',zIndex:'10' 
              }}>
              <Content
                native
                items={items}
                keys={items.map((_, i) => i)}
                reverse={!this.state.open}
                state={state}>
                {(item, i) => ({ x, ...props }) => (
                  <animated.div
                  
                    style={{
                      transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                      width:'100%',
                      ...props,
                    }}>
                    <Form.Item className={i === 0 ? 'middle' : ''}
                    className='hoverEffect'
                    style={{color:'white'}}>
                      {item}
                    </Form.Item>
                  </animated.div>
                )}
              </Content>
            </animated.div>
          )}
        </Sidebar>
      </div>
    )
  }
}
