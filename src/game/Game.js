import ResourceLoader from './engine/ResourceLoader';
import InputManager from './input/InputManager';

export default class Game {

    constructor(){
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

    // move to helper class or a low level object calls
    worldToCameraPosition = (x,y) => {
        const camera = InputManager.getCamera();
        const cameraCornerX = camera.x + (camera.width / 2) + x;
        const cameraCornerY = camera.y + (camera.height / 2) + y;

        return {
            x: cameraCornerX,
            y: cameraCornerY
        }
    }

    draw(ctx, delta) {
        const fps = delta * 3.28084;
        const camera = InputManager.getCamera();

        //mock example
        this.world.objects.forEach(obj => {
            const coords = this.worldToCameraPosition(obj.x,obj.y);
            ctx.beginPath();
            ctx.rect(coords.x,coords.y, obj.w, obj.h);
            ctx.stroke();
            ctx.drawImage(ResourceLoader.get('example1'),coords.x,coords.y, obj.w, obj.h);
        })

        // building ghost
        ctx.drawImage(  ResourceLoader.get('example1-preview'),
                        InputManager.getMousePosition().x - 50,
                        InputManager.getMousePosition().y - 50,
                        100, 100);

        //debug
        ctx.font = "16px Verdana";
        ctx.fillStyle = "lime";
        ctx.fillText(`fps: ${Math.floor(fps)}`, 10, 20);
        ctx.fillText(`camera: ${camera.x}/${camera.y}`, 10, 40);
    }
}

