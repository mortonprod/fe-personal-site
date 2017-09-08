onmessage = function(e) {
  if(e.data.name === "addFlake"){
    snowWorker.addFlake(e.data.z,e.data.width,e.data.randV,e.data.randR);  
    this.postMessage(snowWorker.flakes);
  }
  if(e.data.name==="test"){
    console.log("test reached");
    //postMessage({name:"test",counter:e.data.counter});
    postMessage(42);
    
  }
};


function snowWorker(){
    /**
        This stores all the information about the flake.
        The radius us the actual radius of the flake and not how it is observer from a distance.
        @function
    */
    function flake(x,y,z,vx,vy,vz,r){
        this.x=x,
        this.y=y,
        this.z=z
        this.vx=vx,
        this.vy=vy,
        this.vz=vz,
        this.r=r
       // console.log("Flake " + JSON.stringify(this));
    }
    let flakes=[];
    /**
    Create snow flake. 
    This function will add a new flake to the array of flakes.
    The z position of the flake(The distance from the observer) must be specified by you on creation.
    @function
  */
  function addFlake(z,width,randV,randR){
    let x = Math.random()*width;
    let v = Math.random()*randV -randV/2;
    let r = Math.random()*randR;
    flakes.push(new flake(x,0,z,v,v,v,r));
  }
  /**
    This function will check the z-position of every flake and remove the flakes which have left the screen.
    @function
  */
  function removeFlakes(){
    flakes.forEach((el,index)=>{
        if(el.y > this.state.height){
            this.flakes.splice(index, 1);
        }
    });
  }
  /**
    Move the flake down with basic kinematics.
    Must take into account air friction.
    Parallax will be taken into account when we draw the flake.
    Make sure that z position is never 0.
  */
  function moveFlakes(){
    flakes.forEach((el,index)=>{
        console.log("move " + JSON.stringify(el));
        el.vz = el.vz + Math.random()*this.props.randV -this.props.randV/2;
        if(el.z + el.vz*this.props.timeDelta > 0){
            el.z = el.z + el.vz*this.props.timeDelta;
        }else{
            el.z=0.001
        }

        el.vx = el.vx + Math.random()*this.props.randV -this.props.randV/2;
        el.x = el.x + el.vx*this.props.timeDelta;

        el.vy = el.vy + (10-this.props.airFricAcc)*this.props.timeDelta + Math.random()*this.props.randV -this.props.randV/2;
        el.y = el.y + el.vy*this.props.timeDelta;
    });
  }
}