import Camera from "./Camera";
import * as Goods from "./Goods";
import Map from "./Map";
import Menu from "./Menu";

export default class Main {
    private map: Map;
    private dragingGoods: any;
    private dragList: any[];
    private pointerX: number;
    private pointerY: number;

    constructor() {
        this.map = new Map();
        this.dragList = [];
    }

    public createScene() {
        this.map.createMap();
        const board: Goods.Board = new Goods.Board();
        board.createBoard(1, 1);
        this.dragList.push(board);
        window.addEventListener("keydown", (event) => {this.menu(event); });
        window.addEventListener("mousedown", (event) => { this.dragBefore(event); });
        window.addEventListener("touchstart", (event) => { this.dragBefore(event); });
        window.addEventListener("mousemove", (event) => {
            if (this.dragingGoods !== undefined) {
                this.dragMove(event);
            }
        });
        window.addEventListener("touchmove", (event) => {
            if (this.dragingGoods !== undefined) {
                this.dragMove(event);
            }
        });
        window.addEventListener("mouseup", (event) => { this.dragEnd(event); });
        window.addEventListener("touchend", (event) => { this.dragEnd(event); });

        window.addEventListener("wheel", (event) => { this.zoom(event); });
    }

    private dragBefore(event: any) {
        this.pointerX = event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
        this.pointerY = event.type === "mousedown" ? event.pageY : event.touches[0].pageY;
        for (const goods of this.dragList) {
            if (goods.click(this.pointerX, this.pointerY)) {
                this.dragingGoods = goods;
            }
        }
    }

    private dragMove(event: any) {
        const x: number = event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
        const y: number = event.type === "mousemove" ? event.pageY : event.touches[0].pageY;
        if (this.dragingGoods !== undefined) {
            this.dragingGoods.x += (x - this.pointerX);
            this.dragingGoods.y += (y - this.pointerY);
            this.pointerX = x;
            this.pointerY = y;
        }
    }

    private dragEnd(event: any) {
        this.dragingGoods = undefined;
    }

    private menu(event: any) {
        Menu.createMenuMap();
        if (Menu.goodCanvas.canvas.style.zIndex === "0") {
            Menu.goodCanvas.canvas.style.zIndex = "2";
            Menu.Menurender();
        } else {
            Menu.goodCanvas.canvas.style.zIndex = "0";
        }
    }

    private zoom(event: MouseWheelEvent) {
        if (event.deltaY > 0) {
            Camera.zoom(-0.05);
        } else if (event.deltaY < 0) {
            Camera.zoom(0.05);
        }
    }
}
