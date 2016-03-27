angular.module('myPages',[])
  .controller('myPagesCtrl',function($scope) {
    $scope.current=0;
    $scope.total=$('.pages > .page').length;
    $scope.error="";
    
    // capture anchor clicks and override the functionality of the # links
    $('a[href*=#]:not([href=#])').click(function(eventObj){
      var target=eventObj.target.href.split('/').pop().substr(1);
      if(target.length <= 0) return;
      $scope.goToPage(target);
      $scope.$apply();
    });
      
    /**
     * go to a page with link name or index
     * @param {string|int} page go to a particular page, if the page is string 
     *    then will look to the page with particular link; if the page is an 
     *    integer, the will go to that particular page child
     * @return void
     **/
    $scope.goToPage=function(page) {
      $scope.total=$('.pages > .page').length;
      
      if (page && typeof(page) ==  "string") {
        var left;
        
        switch (page) {
          case "_home":
            left=0;
            break;
            
          case "_next":
            left=$scope.current+1;
            if (left==$scope.total) return;
            break;
            
          case "_prev":
            left=$scope.current-1;
            if (left < 0) return;
            break;
          
          case "_last":
            left=$scope.total-1;
            break;
          
          default:
            //find link
            var dest=$('.pages a[name="#'+page+'"]');
            
            if (dest.length <= 0) {
              $scope.error="Unknown destination '"+page+"'";
              return;
            }
            
            //get child position
            left=dest.parent().index();
            
            if (left <= -1) {
              $scope.error="Unable to determin page '"+page+"' index";
              return;
            }
            break;
        }
        
        $scope.current=left;
      }
      else if(typeof page == "number") {
        if (page < 0 || page >= $scope.total) return;
        $scope.current=page;
      }
      
      $('.pages').css('left','calc('+$scope.current+' * -100%)');
    }
  }
);