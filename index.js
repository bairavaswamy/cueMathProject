class MyScene extends Phaser.Scene {
    constructor() {
        super("scene1");
        this.tileSize = 40;
        this.boardWidth = 8;
        this.boardHeight = 8;
        this.mouse = {
            x: this.tileSize * 3 + this.tileSize / 2,
            y: this.tileSize * 3 + this.tileSize / 2
        };
    }

    preload() {
        this.load.image("rook", "./src/assests/rook.png");
        this.load.image("image", "./src/assests/image.png");
    }

    create() {
        // Chessboard
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                const x = j * this.tileSize;
                const y = i * this.tileSize;
                const color = (i + j) % 2 === 0 ? 0xffffff : 0x808080;
                this.add.rectangle(x, y, this.tileSize, this.tileSize, color).setOrigin(0);
            }
        }

        // Rook sprite
        this.rook = this.add.sprite(this.mouse.x, this.mouse.y, "rook").setInteractive();
        this.rook.setScale(this.tileSize / this.rook.width);

        // Image at the lower-left corner
        const image = this.add.image(this.tileSize / 2, (this.boardHeight - 1) * this.tileSize + this.tileSize / 2, "image");
        image.setScale(this.tileSize / image.width);

        // Collision detection between rook and image
        this.physics.add.collider(image, this.rook, this.handleCollision.bind(this));

        this.input.on("pointerdown", (pointer) => {
            const gridX = Math.floor(pointer.downX / this.tileSize) * this.tileSize + this.tileSize / 2;
            const gridY = Math.floor(pointer.downY / this.tileSize) * this.tileSize + this.tileSize / 2;

            // Restrict movement to horizontal and vertical directions
            if (gridX !== this.rook.x && gridY !== this.rook.y) return;

            // Restrict movement to left and downside
            if (gridX >= this.rook.x && gridY <= this.rook.y) return;

            this.mouse.x = gridX;
            this.mouse.y = gridY;
        });
    }

    update() {
        this.rook.x = this.mouse.x;
        this.rook.y = this.mouse.y;

        // Check for collision
        if (this.physics.overlap(this.rook, this.image)) {
            this.handleCollision();
        }
    }

    handleCollision() {
        console.log("Collision detected!");
        this.scene.restart();
    }
}

const config = {
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight,
    scene: [MyScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
