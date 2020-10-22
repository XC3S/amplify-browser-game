class InputManager {
    constructor(){
        if (!!InputManager.instance) {
            return InputManager.instance;
        }
        InputManager.instance = this;

        this.camera = {
            x: 0,
            y: 0,
            width: 640, 
            height: 425
        };
        this.drag = {
            dragging: false,
            cameraStart: {
                x: 0,
                y: 0
            },
            dragStart: {
                x: 0,
                y: 0
            }
        };
        this.mouse = {
            interface: {
                x: 0,
                y: 0
            },
            world: {
                x: 0,
                y: 0
            }
        };

        this.canvasRef = null;

        return this;
    }

    initialize(canvas) {
        this.canvasRef = canvas;
    }

    mouseMove(event) {
        if(this.drag.dragging) {
            const relativeX = this.drag.dragStart.x - event.screenX;
            const relativeY = this.drag.dragStart.y - event.screenY;
            this.camera.x = this.drag.cameraStart.x - relativeX;
            this.camera.y = this.drag.cameraStart.y - relativeY;
        }

        const canvasRect = this.canvasRef.getBoundingClientRect();

        this.mouse = {
            interface: {
                x: event.pageX - canvasRect.left,
                y: event.pageY - canvasRect.top
            },
            world: {
                x: (event.pageX - canvasRect.left) - (640 / 2) - this.camera.x,
                y: (event.pageY - canvasRect.top) - (425 / 2) - this.camera.y
            }
        };
    }

    mouseDown(event) {
        if(event.button === 0){
            this.drag.dragging = true;
            this.drag.cameraStart.x = this.camera.x;
            this.drag.cameraStart.y = this.camera.y;
            this.drag.dragStart.x = event.screenX;
            this.drag.dragStart.y = event.screenY;
        }
    }

    mouseUp(event) {
        if(event.button === 0){
            this.drag.dragging = false;
        }
    }
    
    getCamera(){
        return this.camera;
    }

    getMousePosition(){
        return this.mouse.interface;
    }

    getWorldMousePosition(){
        return this.mouse.world;
    }
}

export default new InputManager();