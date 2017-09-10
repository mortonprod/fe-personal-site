import React, { Component } from 'react';
import "./asyncComponent.css";
/**
    A function which will return a component with importComponent defined in the correct context.
    Note when the module has been imported it will not be imported again. The promise will just resolve instantly.
    The behaviour of this component is show loading until isShow true. If isShow set back to false the component will still be shown.
    However, if we unmount and mount again for rerouting, isShow will be null and componentDidMount will not add state, so "loading" will be shown.
    However, when isShow set to true again the component will be mounted instantly since it was already downloaded before.
    --------------
    The service worker places chunk in cache. However, looking network in dev tools shows it is not downloaded and stored until we go to that component. 
    This means the user will not have this stored until they have scrolled passed the components.
    @param isShow  Get component from server when true.
    @function
*/
function asyncComponent(importComponent) {
  /**
    This is the component wrapper for the component you want to lazy load.
    @class
  */
  class AsyncComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }
    /**
        If isShow from the beginning then get component from after mounting. 
        Otherwise wait for isShow props change.
    */
    componentDidMount() {
      if(this.props.isShow){
	      new Promise((resolve,reject)=>{
	        
	        resolve(importComponent())
	        
	      }).then((result)=>{

	      this.setState({
	        component: result.default
	      });

	      });
      }
    }
    /**
        When isShow true connect to server.
        Only render the component if we have gone from false to true or null to true.
        Need to do this since we will pass props from to component through async component.
        @function
    */
    componentWillReceiveProps(nextProps){
        if(nextProps.isShow && this.props.isShow !== nextProps.isShow){
          new Promise((resolve,reject)=>{
            
            resolve(importComponent())
            
          }).then((result)=>{

          this.setState({
            component: result.default
          });

          });
        }
    }

    render() {
      const C = this.state.component;

      return C
        ? <C {...this.props} />
        : (<div className={"asyncComponent"}>
            <h2>loading</h2>
           </div>
          );
    }

  }
  AsyncComponent.defaultProps = {
    isShow:false
  }
  return AsyncComponent;
}

export default asyncComponent