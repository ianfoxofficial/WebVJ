import { BaseDrawlayer } from "./BaseDrawlayer";

export class BasicDrawlayer extends BaseDrawlayer implements DrawLayer {

    beginFrame() {
        this.gfx.clear();
        
        
    }
    draw(color:any) {
        super.draw(color);
        this.beginFrame();
        if(this.gfx) {
            
           
            this.gfx.beginFill(parseInt(color));
            this.gfx.drawRect(0,0,this.width, this.height);
        } else {
            throw Error("No Drawing Layer provided");
        }
    }


}