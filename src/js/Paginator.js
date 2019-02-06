import PubSub from 'pubsub-js'
export default class Paginator{
    constructor(){
        // $(body).addClass('js-enabled')
        this.scrollEvents()
        this.clickEvents()
        this.activeSlide = 1
        this.canGo = 1
        this.max = $('.section').length
        this.delay = 1300
    }

    scrollEvents() {
        var self = this;
  
        $(window).on('wheel',function(e) {
            if(!self.canGo) return;
            e = e.originalEvent;
            var direction = e.deltaY>0? 1:-1;
            
            var newslide = self.activeSlide + direction;
            if(newslide>self.max || newslide<1) return;
            self.canGo = false;
            
            PubSub.publish( 'gotoSlide', {from: self.activeSlide,to:newslide} );
            self.activeSlide = newslide;
            setTimeout(function() {
                self.canGo = true;
            }, self.delay);
        });
    }

    clickEvents(){
        // alert(a)
    }
}