<?php 

class Observable{
  
  private $listeners = [];
  private $vl = '';

   
    function __construct($vl){
      $this->vl = $vl;
    }


    function set($v){
      $this->vl = $v;
      $this->notify($v);
    }


    function get(){
      return $this->vl;
    }

    function observe($obj){
    	$this->listeners[] = $obj;
    }

    private function notify($newVal){
       foreach ($this->listeners as $callback){
       	  if ( is_callable($callback) ){
             // $item->update($newVal);
             $callback($newVal);
       	  }
       }
    }

}


class Computed extends Observable{
   
   private $obj = null;

   function __construct($callback,$observables){

   	  parent::__construct('');
      
      $obj = $this; // new Observable('');
      foreach ($observables as $k=>$item){
         $item->observe(function() use ($obj,$callback){
             $obj->set($callback());
         });
      }

     $this->set($callback()); 

   }


}




class Rx{

  
    public static function observable($vl){
    	return (new Observable($vl));
    }

    public static function compute($callback,$observables){
    	return (new Computed($callback,$observables));
    }

   
}




$a = Rx::observable(23);
$b = Rx::observable(50);

$c = Rx::compute(function() use ($a,$b){
  
    return ( $a->get() + $b->get() );

},[$a,$b]);



echo $a->get();
echo '<br />';
echo $b->get();
echo '<br />';
echo $c->get();
echo '<br />';
echo '<hr />';
$a->set(101);
echo '<br />';
echo '<br />';
echo $c->get();


