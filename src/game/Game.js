import ResourceLoader from './engine/ResourceLoader';

export default class Game {

    constructor(){
        this.camera = {
            x: 0,
            y: 0
        }

        //mock
        this.world = {
            objects: [
                {
                    x: -50,
                    y: -50,
                    w: 100,
                    h: 100
                },
                {
                    x: 100,
                    y: 200,
                    w: 100,
                    h: 100
                }
            ]
        }
    }

    moveCamera = (newCamera) => {
        this.camera = newCamera;
    }

    // move to helper class or a low level object calls
    worldToCameraPosition = (x,y) => {
        const cameraSize = {
            width: 640, 
            height: 425
        };

        const cameraCornerX = this.camera.x + (cameraSize.width / 2) + x;
        const cameraCornerY = this.camera.y + (cameraSize.height / 2) + y;

        return {
            x: cameraCornerX,
            y: cameraCornerY
        }
    }

    draw(ctx, delta) {
        const fps = delta * 3.28084;

        //mock example
        this.world.objects.forEach(obj => {
            const coords = this.worldToCameraPosition(obj.x,obj.y);
            ctx.beginPath();
            ctx.rect(coords.x,coords.y, obj.w, obj.h);
            ctx.stroke();
            ctx.drawImage(ResourceLoader.get('example1'),coords.x,coords.y, obj.w, obj.h);
        })

        //debug
        ctx.font = "16px Verdana";
        ctx.fillStyle = "lime";
        ctx.fillText(`fps: ${Math.floor(fps)}`, 10, 20);
        ctx.fillText(`camera: ${this.camera.x}/${this.camera.y}`, 10, 40);
    }
}

