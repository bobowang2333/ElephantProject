$(function() {
    console.log('hello');

    var x1 = 0;
    var x2 = 0;
    var y1 = 0;
    var y2 = 0;
    //var dx = 0;
    //var dy = 0;

    function min(a, b) {
        if (a < b)
            return a;
        else
            return b;
        
    }
    function max(a, b) {
        if (a > b)
            return a;
        else
            return b;
    }

    


    var Diagram = function(dom) {
        this.dom = dom;
        this.imageLayer = $('<canvas class="layer image" style="z-index:1"></canvas>');
        this.rectLayer = $('<canvas class="layer rect" style="z-index:2"></canvas>');
        this.dom.append(this.rectLayer);
        this.dom.append(this.imageLayer);

        this.imgDom = undefined;
        this.rectLayerCtx = this.rectLayer[0].getContext('2d');
        this.imageLayerCtx = this.imageLayer[0].getContext('2d');
        this.drawing = false;
        this.startx = 0;
        this.starty = 0;
        this.strokeStyle = '#7F00FF';
        this.dom.on('mousedown touchdown', this.onTouchDown.bind(this));
        this.dom.on('mousemove touchmove', this.onTouchMove.bind(this));
        this.dom.on('mouseup touchup', this.onTouchUp.bind(this));
        this.dom.on('touchcancel', this.onTouchCancel.bind(this));
        this.rects = [];
        //this.rectcord =[];
    }

    Diagram.prototype.onTouchDown = function(e) {
        this.drawing = true;
        this.startx = e.clientX;
        this.starty = e.clientY;
        //x1 = this.startx;                   // change1
        //y1 = this.starty;                   //change2
        this.rectLayerCtx.strokeStyle = this.strokeStyle;

        // draw count
        this.rectLayerCtx.fillText(this.rects.length, this.startx, this.starty);
    }

    Diagram.prototype.onTouchMove = function(e) {
        if (this.drawing) {
            var xt = e.clientX;
            var yt = e.clientY;
            if (this.startx<xt && this.starty<yt) { //1
                this.rectLayerCtx.clearRect(this.startx-1, this.starty-1, max(xt, this.movex-this.startx)+1, max(yt, this.movey-this.starty)+1);
                document.getElementById('zz').innerHTML='第一象限'
            }else
            if (this.startx>xt && this.starty<yt){  //2 x
                this.rectLayerCtx.clearRect(this.startx-1, this.starty-1, min(xt, this.movex-this.startx)-1, max(yt, this.movey-this.starty)+1);
                document.getElementById('zz').innerHTML='第二象限'
            }else
            if (this.startx>xt && this.starty>yt) { //3 x y
                this.rectLayerCtx.clearRect(this.startx-1, this.starty-1, min(xt, this.movex-this.startx)-1, min(yt, this.movey-this.starty)-1);
                document.getElementById('zz').innerHTML='第三象限'
            }else {                                 //4 y  ---undef
                this.rectLayerCtx.clearRect(this.startx-1, this.starty-1, max(xt, this.movex-this.startx)+1, min(yt, this.movey-this.starty)-1);
                document.getElementById('zz').innerHTML='第四象限'
            }


            //this.rectLayerCtx.clearRect(this.startx, this.starty, this.movex-this.startx, this.movey-this.starty);
            this.movex = e.clientX;
            this.movey = e.clientY;

            this.rectLayerCtx.beginPath();
            this.rectLayerCtx.rect(this.startx, this.starty, this.movex-this.startx, this.movey-this.starty);
            this.rectLayerCtx.stroke();



            dx = this.movex - this.startx;//
            dy = this.movey - this.starty;//

        }
    }

    Diagram.prototype.onTouchUp = function(e) {
        this.drawing = false;
        this.rects.push({
            left: this.startx,
            right: this.movex
        });
        ////////////////
       /* this.rectcord.push({
            x_1: this.startx,
            x_2: this.movex
            y_1: this.starty,
            y_2: this.movey
        })
    */
    }

    Diagram.prototype.onTouchCancel = function(e) {
        this.drawing = false;
        console.log(e);
    }

    Diagram.prototype.drawImage = function(imgDom) {
        this.imgDom = imgDom;
        this.imgDom.on('load', (function(e) {
            /*
            this.width = imgDom[0].width;
            this.height = imgDom[0].height;
            this.rectLayer.attr('width', this.width + 'px');
            this.rectLayer.attr('height', this.height + 'px');
            this.imageLayer.attr('width', this.width + 'px');
            this.imageLayer.attr('height', this.height + 'px');

            this.imageLayerCtx.drawImage(imgDom[0], 0, 0);
            */
            document.getElementById('md').innerHTML=imgDom.length;
            for (var i=0; i<imgDom.length; i++)
            {
                this.width = imgDom[i].width;
                this.height = imgDom[i].height;
                this.rectLayer.attr('width', this.width + 'px');
                this.rectLayer.attr('height', this.height + 'px');
                this.imageLayer.attr('width', this.width + 'px');
                this.imageLayer.attr('height', this.height + 'px');

                this.imageLayerCtx.drawImage(imgDom[i], 0, 0);    
            }
            
            
            //---->
            //for (var i=0; i<this.rects.length; i++)
            //  this.imageLayerCtx.drawImage(imgDom[i], 0, 0);

        }).bind(this));
    }

    var d = new Diagram($('.diagram'));
    d.drawImage($('#test'));

    $('.submit').on('click', function(e) {
        for(var i=0; i<d.rects.length; i++) {
            document.write(i + ',' + d.rects[i].left + ',' + d.rects[i].right + '<br/>');
        }   
    });
});
