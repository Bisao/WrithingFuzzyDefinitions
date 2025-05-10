
export class Grid {
    constructor(scene, width, height) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.initialize();
    }

    initialize() {
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = null;
            }
        }
    }

    cartesianToIsometric(x, y) {
        return {
            x: (x - y) * (TILE_WIDTH / 2),
            y: (x + y) * (TILE_HEIGHT / 2)
        };
    }

    isometricToCartesian(x, y) {
        const tileY = (y / TILE_HEIGHT + x / TILE_WIDTH) / 2;
        const tileX = (y / TILE_HEIGHT - x / TILE_WIDTH) / 2;
        return { x: Math.floor(tileX), y: Math.floor(tileY) };
    }

    getTileAt(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.tiles[y][x];
        }
        return null;
    }

    setTileAt(x, y, tile) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.tiles[y][x] = tile;
        }
    }
}
