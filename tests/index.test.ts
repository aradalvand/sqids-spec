import { expect, test } from 'vitest';
import Sqids, { defaultOptions } from '../src/index.ts';

test('incremental numbers', () => {
	const sqids = new Sqids();

	const ids = {
		bV: [0],
		U9: [1],
		g8: [2],
		Ez: [3],
		V8: [4],
		ul: [5],
		O3: [6],
		AF: [7],
		ph: [8],
		n8: [9]
	};

	for (const [id, numbers] of Object.entries(ids)) {
		expect.soft(sqids.encode(numbers)).toBe(id);
		expect.soft(sqids.decode(id)).toEqual(numbers);
	}
});

test('incremental numbers, same index 0', () => {
	const sqids = new Sqids();

	const ids = {
		SrIu: [0, 0],
		nZqE: [0, 1],
		tJyf: [0, 2],
		e86S: [0, 3],
		rtC7: [0, 4],
		sQ8R: [0, 5],
		uz2n: [0, 6],
		'7Td9': [0, 7],
		'3nWE': [0, 8],
		mIxM: [0, 9]
	};

	for (const [id, numbers] of Object.entries(ids)) {
		expect.soft(sqids.encode(numbers)).toBe(id);
		expect.soft(sqids.decode(id)).toEqual(numbers);
	}
});

test('incremental numbers, same index 1', () => {
	const sqids = new Sqids();

	const ids = {
		SrIu: [0, 0],
		nbqh: [1, 0],
		t4yj: [2, 0],
		eQ6L: [3, 0],
		r4Cc: [4, 0],
		sL82: [5, 0],
		uo2f: [6, 0],
		'7Zdq': [7, 0],
		'36Wf': [8, 0],
		m4xT: [9, 0]
	};

	for (const [id, numbers] of Object.entries(ids)) {
		expect.soft(sqids.encode(numbers)).toBe(id);
		expect.soft(sqids.decode(id)).toEqual(numbers);
	}
});

test('minimum length', () => {
	for (const minLength of [1, 10, defaultOptions.alphabet.length]) {
		for (const numbers of [
			[0],
			[1, 2, 3, 4, 5],
			[100, 200, 300],
			[1_000, 2_000, 3_000],
			[1_000_000]
		]) {
			const sqids = new Sqids({
				...defaultOptions,
				minLength
			});

			const id = sqids.encode(numbers);
			expect.soft(id.length).toBeGreaterThanOrEqual(minLength);
			expect.soft(sqids.decode(id)).toEqual(numbers);
		}
	}
});

test('blacklist', () => {
	const sqids = new Sqids({
		...defaultOptions,
		blacklist: new Set([
			'8QRLaD', // result of the 1st encoding
			'7T1cd0dL' // result of the 2nd encoding
		])
	});

	expect.soft(sqids.encode([1, 2, 3])).toBe('RA8UeIe7');
	expect.soft(sqids.decode('RA8UeIe7')).toEqual([1, 2, 3]);

	expect.soft(sqids.decode('8QRLaD')).toEqual([1, 2, 3]);
	expect.soft(sqids.decode('7T1cd0dL')).toEqual([1, 2, 3]);
});

test('encoding/decoding', () => {
	const sqids = new Sqids();

	const numbers = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
		26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
		50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
		74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
		98, 99
	];
	const output = sqids.decode(sqids.encode(numbers));
	expect.soft(numbers).toEqual(output);
});

test('short alphabet', () => {
	const sqids = new Sqids({
		...defaultOptions,
		alphabet: 'abcde',
		minLength: 5
	});

	const numbers = [1, 2, 3000];
	expect.soft(sqids.decode(sqids.encode(numbers))).toEqual(numbers);
});
