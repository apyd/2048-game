export default class Tile {
	constructor() {
		this.nextAvailableTileId = 0;
	}

	create(tileCoordinates) {
		return {
			id: this.nextAvailableTileId,
			val: 2,
			x: tileCoordinates.x,
			y: tileCoordinates.y,
			mergedId: null
		};
	}

	resetNextAvailableTileId() {
		this.nextAvailableTileId = 0;
	}

	incrementNextAvailableTileId() {
		this.nextAvailableTileId += 1;
	}
}
