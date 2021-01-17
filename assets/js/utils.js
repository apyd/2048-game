import keys from './keys.js';

export function generateRandomCoordinates(maxBoundary) {
	return {
		x: Math.floor(Math.random() * maxBoundary),
		y: Math.floor(Math.random() * maxBoundary)
	};
}
export function calculateAngle(initX, initY, eX, eY) {
	let angle = Math.atan2(Math.round(eY - initY), Math.round(eX - initX));
	angle *= 180 / Math.PI;
	return Math.round(angle);
}

export function convertAngleToKey(angle) {
	let key;
	if (angle >= -135 && angle < -45) key = keys.arrowUp;
	else if (angle >= -45 && angle < 45) key = keys.arrowRight;
	else if (angle >= 45 && angle < 135) key = keys.arrowDown;
	else key = keys.arrowLeft;
	return key;
}

export function checkIfEnoughSwipeDistance(eX, initX, eY, initY, minSwipeDistance) {
	return !!(Math.abs(Math.round(eY - initY)) < minSwipeDistance
	&& Math.abs(Math.round(eX - initX)) < minSwipeDistance);
}

export function checkIfArraysEqual(arr1, arr2) {
	if (arr1 && arr2) return false;
	const previouslyUpdatedTiles = JSON.stringify(arr1);
	const arrWithUpdatedTiles = JSON.stringify(arr2);
	return previouslyUpdatedTiles === arrWithUpdatedTiles;
}

export function convertMillisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	if (!minutes) return `${seconds} seconds`;
	const minutesToShow = `${minutes === 1 ? `${minutes} minute` : `${minutes} minutes`}`;
	return `${minutesToShow} ${seconds} seconds`;
}