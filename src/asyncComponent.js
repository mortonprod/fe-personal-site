import React, { Component } from 'react';
/**
    A function which will return a component class with importComponent defined in the correct context.
    On initial render show loading page. After this call component Did mount only when import retrieved.
    Always update state with new component when retrieved. Therefore, this component should only be mounted when we want a new module from the server.

    @class
*/
export default function asyncComponent(importComponent) {

  class AsyncComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      new Promise((resolve,reject)=>{
        
        resolve(importComponent())
        
      }).then((result)=>{

      this.setState({
        component: result.default
      });

      });
    }

    render() {
      const C = this.state.component;

      return C
        ? <C {...this.props} />
        : (<div>loading</div>);
    }

  }

  return AsyncComponent;
}
