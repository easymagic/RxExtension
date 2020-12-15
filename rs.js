/**

Dependency: jQuery

**/

let Rx = {};

Rx.observable = function(v){
  
  let listeners = [];
  var vl = v || '';


  function triggerListeners(newVal){
     listeners.forEach((callback,k)=>{
        
        //
        callback(newVal);

     });
  }



  return {
   
     get(){
       return vl;
     },

     set(inVal){
       vl = inVal;
       triggerListeners(vl);
     },

     observe(cb){
        listeners.push(cb);
     }

  };


};



Rx.compute = function(cb,listeners){

   var obj = Rx.observable('');

   listeners.forEach((v,k)=>{
  
     v.observe(function(newVal){

        console.log(newVal);

        obj.set(cb());

     });

   });
  
   return obj;

};




Rx.bindVal = function($el,observable){

	observable.observe(function(newVal){

       $el.val(newVal);
      
	});

};



Rx.bindHtml = function($el,observable){

	observable.observe(function(newVal){

       $el.html(newVal);
      
	});

};



Rx.bindAttr = function($el,attr,observable){

   observable.observe(function(newVal){
 
       $el.attr(attr,newVal);  

   });

};



Rx.bindClass = function($el,cls,expression,observable){

   observable.observe(function(newVal){
  
       $el.removeClass(cls);

       if (expression()){
       
             $el.addClass(cls);

       }

   });

};


Rx.bindReadOnly = function($el,expression,observable){
  
   observable.observe(function(newVal){

      
      $el.attr('readonly','readonly');

      if (expression()){

           $el.removeAttr('readonly');

      }

   });

};



Rx.bindEnabled = function($el,expression,observable){
  
   observable.observe(function(newVal){

      
      $el.attr('disabled','disabled');

      if (expression()){

           $el.removeAttr('disabled');

      }

   });

};


