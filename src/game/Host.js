import React from 'react';
import Game from './Game';

import ResourceLoader from './engine/ResourceLoader';

class Host extends React.Component {

    constructor(props) {
        super(props);
        this.game = new Game();
        this.lastDraw = performance.now();
        this.camera = {
            x: 0,
            y: 0
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
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        // load resources
        ResourceLoader.initialize((resources) => {
            console.log('[ENGINE] Resources loaded:', resources);

            // start game loop
            this.draw(ctx);
        });
    }

    draw(ctx) {
        const now = performance.now();
        const deltaTime = now - this.lastDraw;
        this.lastDraw = now;

        ctx.clearRect(0, 0, 640, 425);
        this.game.draw(ctx, deltaTime);

        window.requestAnimationFrame(() => {
            this.draw(ctx);
        })
    }

    onMouseMove = (event) => {
        if(this.drag.dragging) {
            const relativeX = this.drag.dragStart.x - event.screenX;
            const relativeY = this.drag.dragStart.y - event.screenY;
            this.camera.x = this.drag.cameraStart.x - relativeX;
            this.camera.y = this.drag.cameraStart.y - relativeY;
            this.game.moveCamera(this.camera);
        }

        const canvasRect = this.refs.canvas.getBoundingClientRect();

        this.game.updateMouse({
            interface: {
                x: event.pageX - canvasRect.left,
                y: event.pageY - canvasRect.top
            },
            world: {
                x: (event.pageX - canvasRect.left) - (640 / 2) - this.camera.x,
                y: (event.pageY - canvasRect.top) - (425 / 2) - this.camera.y
            }
        })
        
    }

    onMouseDown = (event) => {
        if(event.button === 0){
            this.drag.dragging = true;
            this.drag.cameraStart.x = this.camera.x;
            this.drag.cameraStart.y = this.camera.y;
            this.drag.dragStart.x = event.screenX;
            this.drag.dragStart.y = event.screenY;

        }
    }

    onMouseUp = (event) => {
        if(event.button === 0){
            this.drag.dragging = false;
        }
    }

    render(){
        return (
            <div className='host' style={{ overflow: 'hidden', maxHeight: '100vh', maxWidth: '100vw'}}>
                <canvas 
                    ref="canvas" 
                    width={640} 
                    height={425} 
                    style={{ border: '1px solid black', margin: 'calc((100vh - 427px) / 2) calc((100vw - 642px) / 2)'}}
                    onMouseMove={this.onMouseMove}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                />
            </div>
        )
    }
}

export default Host