export interface OptionWithVotes {
	id: string;
	text: string;
	votes: number;
}

export interface TierResult {
	S: OptionWithVotes[];
	A: OptionWithVotes[];
	B: OptionWithVotes[];
	C: OptionWithVotes[];
}

export function calculateTiers(options: OptionWithVotes[]): TierResult {
	const sorted = [...options].sort((a, b) => b.votes - a.votes);

	const tiers: TierResult = {
		S: [],
		A: [],
		B: [],
		C: []
	};

	const total = sorted.length;

	if (total === 0) return tiers;

	// Percentile-based tier distribution
	const cuts = {
		S: Math.ceil(total * 0.2),
		A: Math.ceil(total * 0.5),
		B: Math.ceil(total * 0.8)
	};

	sorted.forEach((opt, i) => {
		if (i < cuts.S) {
			tiers.S.push(opt);
		} else if (i < cuts.A) {
			tiers.A.push(opt);
		} else if (i < cuts.B) {
			tiers.B.push(opt);
		} else {
			tiers.C.push(opt);
		}
	});

	return tiers;
}

export const tierColors = {
	S: 'bg-red-500 text-white',
	A: 'bg-orange-500 text-white',
	B: 'bg-yellow-500 text-black',
	C: 'bg-slate-500 text-white'
} as const;
