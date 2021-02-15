import { arrowKeys } from './keys.js';

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
	if (angle >= -135 && angle < -45) return arrowKeys.ArrowUp;
	if (angle >= -45 && angle < 45) return arrowKeys.ArrowRight;
	if (angle >= 45 && angle < 135) return arrowKeys.ArrowDown;
	return arrowKeys.ArrowLeft;
}

export function checkIfEnoughSwipeDistance(eX, initX, eY, initY, minSwipeDistance) {
	return !(Math.abs(Math.round(eY - initY)) < minSwipeDistance && Math.abs(Math.round(eX - initX)) < minSwipeDistance);
}

export function checkIfArraysEqual(firstArray, secondArray) {
	if (!(firstArray || secondArray)) return false;
	return JSON.stringify(firstArray) === JSON.stringify(secondArray);
}

export function convertMillisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	if (!minutes) return `${seconds} seconds`;
	const minutesToShow = `${minutes === 1 ? `${minutes} minute` : `${minutes} minutes`}`;
	return `${minutesToShow} ${seconds} seconds`;
}

export function sortArray(arrayToSort, key) {
	if (key === arrowKeys.ArrowLeft || key === arrowKeys.ArrowUp) {
		return ((arrayToSort.filter((arrayElement) => arrayElement)))
			.concat(arrayToSort.filter((arrayElement) => !arrayElement));
	}
	return ((arrayToSort.filter((arrayElement) => !arrayElement)))
		.concat(arrayToSort.filter((arrayElement) => arrayElement));
}

export function getAllElementsFromMultidimensionalArray(multiDimensionalArray) {
	return [].concat(...multiDimensionalArray).filter((el) => el);
}

export function updateItemsCoordinatesInMultidimensionalArray(multiDimensionalArray) {
	return multiDimensionalArray.map((array, index) => array.map((arrayItem) => {
		if (!arrayItem) return '';
		return {
			...arrayItem,
			y: index,
			x: array.map((arrayElement) => arrayElement.id).indexOf(arrayItem.id)
		};
	}));
}