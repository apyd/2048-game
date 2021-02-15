export default class Score {
	bestScore;

	constructor() {
		this.currentScore = 0;
	}

	resetScore() {
		this.currentScore = 0;
	}

	getCurrentScore() {
		return this.currentScore;
	}

	setBestScore(gameType) {
		this.bestScore = +localStorage.getItem(`bestScore${gameType}`);
	}

	update(pointsToAdd, gameType) {
		this.currentScore += pointsToAdd;
		if (this.currentScore > this.bestScore) {
			localStorage.setItem(`bestScore${gameType}`, this.currentScore);
			this.bestScore = +localStorage.getItem(`bestScore${gameType}`);
		}
		return this.currentScore;
	}
}