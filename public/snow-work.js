if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
    let snow = null; 
    onmessage = function(e) {
      if(e.data.name==="setParameters"){
        //console.log("Set Parameters");
        snow = snowWorker(
            e.data.max,
            e.data.createNum,
            e.data.randZ,
            e.data.randV,
            e.data.randR,
            e.data.zMin,
            e.data.timeDelta,
            e.data.airFricAcc,
            e.data.width,
            e.data.height
        );
      }
      if(e.data.name==="updateFlakes"){
        //console.log("Update Flakes");
        snow.updateFlakes();
        postMessage({name:"updatedFlakes",flakes:snow.flakes});  
      }
    };


    function snowWorker(max,createNum,randZ,randV,randR,zMin,timeDelta,airFricAcc,width,height){
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
      function addFlake(z){
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
            if(el.y > height){
              flakes.splice(index, 1);
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
            //console.log("move " + JSON.stringify(el));
            el.vz = el.vz + Math.random()*randV -randV/2;
            if(el.z + el.vz*timeDelta > 0){
                el.z = el.z + el.vz*timeDelta;
            }else{
                el.z=0.001
            }

            el.vx = el.vx + Math.random()*randV -randV/2;
            el.x = el.x + el.vx*timeDelta;

            el.vy = el.vy + (10-airFricAcc)*timeDelta + Math.random()*randV -randV/2;
            el.y = el.y + el.vy*timeDelta;
        });
      }
      /**
        This function will add/remove flakes and then iteratively move them one step forward.
        @function
      */
      function updateFlakes(){
          removeFlakes();
          if(this.flakes.length < max){
            for(let i=0;i<createNum;i++){
              let z = Math.random()*randZ+zMin;
              addFlake(z);
            }
          }
          moveFlakes();
      }
      return {
        updateFlakes,
        flakes
      }
    }
}