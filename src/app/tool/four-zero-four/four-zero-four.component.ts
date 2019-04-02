import { Component, OnInit } from '@angular/core';

class Zodiac {
    _ctx: CanvasRenderingContext2D;
    _: {
        z: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        dx: number;
        dy: number;
    }[];
    _refresh: () => void;
    options: any = {
        directionX: -1, // -1:left;0:random;1:right
        directionY: -1, // -1:up;0:random;1:down
        velocityX: [0.1, 0.2], // [minX,maxX]
        velocityY: [0.5, 1], // [minY,maxY]
        bounceX: true, // bounce at left and right edge
        bounceY: false, // bounce at top and bottom edge
        parallax: 0.2, // float [0-1...]; 0: no paralax
        pivot: 0, // float [0-1...]; 0: no paralax
        density: 6000, // px^2 per node
        dotRadius: [1, 5], // px value or [minR,maxR]
        // backgroundColor: 'rgba(9,9,9,1)',   // default transparent; use alpha value for motion blur and ghosting
        // dotColor: 'rgba(99,99,99,.5)',
        linkColor: 'rgba(99,99,99,.8)',
        linkDistance: 50,
        linkWidth: 2,
    };

    constructor(canvas: any, options: any = {}) {
        canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

        if (canvas.tagName !== 'CANVAS') {
            throw new Error('no canvas');
        }

        Object.keys(options).forEach(key => (this.options[key] = options[key]));

        options = this.options;

        const ctx = (this._ctx = canvas.getContext('2d', { alpha: !options.backgroundColor }));

        const tilt = { x: 0, y: 0 };

        let _, w, h;

        const update = () => {
            if (options.backgroundColor) {
                ctx.fillStyle = options.backgroundColor;
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = options.dotColor;
            } else {
                ctx.clearRect(0, 0, w, h);
            }

            ctx.beginPath();

            for (let i = 0, p, x, y; i < _.length; i++) {
                p = _[i];

                /* MOVE */
                p.x += p.vx;
                p.y += p.vy;

                /* POSITION */
                if (options.parallax) {
                    const fac = p.z * options.parallax;
                    p.dx += (tilt.x * fac - p.dx) / 10;
                    p.dy += (tilt.y * fac - p.dy) / 10;
                }

                x = p.x + p.dx;
                y = p.y + p.dy;

                if (x < 0 || x > w) {
                    options.bounceX ? (p.vx = -p.vx) : (p.x = ((x + w) % w) - p.dx);
                }

                if (y < 0 || y > h) {
                    options.bounceY ? (p.vy = -p.vy) : (p.y = ((y + h) % h) - p.dy);
                }

                /* DRAW */
                ctx.moveTo(x + p.r, y);
                ctx.arc(x, y, p.r, 0, Math.PI * 2);

                // loop back no double connections
                for (let j = i - 1; j >= 0; j--) {
                    const q = _[j],
                        dx = q.x - p.x,
                        dy = q.y - p.y,
                        dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < options.linkDistance) {
                        let xPoint = p.x + p.dx,
                            yPoint = p.y + p.dy,
                            x2 = q.x + q.dx,
                            y2 = q.y + q.dy;
                        const aPoint = Math.atan2(y2 - yPoint, x2 - xPoint);
                        const cos = Math.cos(aPoint);
                        const sin = Math.sin(aPoint);

                        xPoint += p.r * cos;
                        yPoint += p.r * sin;
                        x2 -= q.r * cos;
                        y2 -= q.r * sin;

                        ctx.moveTo(xPoint, yPoint);
                        ctx.lineTo(x2, y2);
                    }
                }
            }
            ctx.stroke();

            if (options.dotColor) {
                ctx.fill();
            }

            requestAnimationFrame(update);
        };

        function onMousemove(ev?: MouseEvent) {
            tilt.x = ev.pageX - window.innerWidth / 2;
            tilt.y = ev.pageY - window.innerHeight / 2;
        }

        function onOrientation(ev?: any) {
            tilt.x = Math.min(Math.max(-ev.gamma, -30), 30) * (window.innerWidth / 30);
            tilt.y = Math.min(Math.max(-ev.beta, -30), 30) * (window.innerHeight / 30);
        }

        const onResize = (this._refresh = () => {
            _ = this._ = this._ || [];

            let radius = [].concat(options.dotRadius);
            if (radius.length === 1 || radius[0] === radius[1]) {
                radius = radius[0];
            }
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;

            const vx = options.velocityX,
                vy = options.velocityY,
                random = Math.random;

            const num = Math.ceil((w * h) / options.density);

            for (let i = _.length - 1; i >= 0; i--) {
                if (_[i].x > w || _[i].y > h) {
                    _.splice(i, 1);
                }
            }

            if (num < _.length) {
                _.splice(num);
            }

            while (num > _.length) {
                const r = random();
                _.push({
                    // position
                    z: (r - options.pivot) / 4, // z
                    r: radius[1] ? r * (radius[1] - radius[0]) + radius[0] : radius,
                    x: Math.ceil(random() * w),
                    y: Math.ceil(random() * h),
                    //  velocity: (random)direction * clamped random velocity
                    vx: (options.directionX || (random() > 0.5 ? 1 : -1)) * (random() * (vx[1] - vx[0]) + vx[0]),
                    vy: (options.directionY || (random() > 0.5 ? 1 : -1)) * (random() * (vy[1] - vy[0]) + vy[0]),
                    // offset
                    dx: 0,
                    dy: 0,
                });
            }

            ctx.strokeStyle = options.linkColor;
            ctx.lineWidth = options.linkWidth;
            ctx.fillStyle = options.dotColor;
        });

        window.addEventListener('resize', onResize, false);
        document.addEventListener('mousemove', onMousemove, false);
        window.addEventListener('deviceorientation', onOrientation, false);
        onResize();
        update();
    }
}

(function() {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback: FrameRequestCallback) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

@Component({
    selector: 'ratel-four-zero-four',
    templateUrl: './four-zero-four.component.html',
    styleUrls: ['./four-zero-four.component.scss'],
})
export class FourZeroFourComponent implements OnInit {
    zodiac: Zodiac;

    constructor() {}

    ngOnInit() {
        this.zodiac = new Zodiac('zodiac', {
            dotColor: '#fff',
            lineColor: '#555555',
            particleRadius: 6,
            curveLines: true,
            density: 9000,
            proximity: 100,
        });
    }
}
