import autobind from 'autobind-decorator';
import Module from '@/module';
import serifs from '@/serifs';
import { genItem } from '@/vocabulary';
import config from '@/config';
import * as loki from 'lokijs';
import { Note } from '@/misskey/note';
import { kewyegenabo } from '@/kewyegenabo';

export default class extends Module {
	public readonly name = 'noting';

	private learnedKeywords?: loki.Collection<{
		keyword: string;
		learnedAt: number;
	}>;

	@autobind
	public install() {
		if (config.notingEnabled === false) return {};

		if (config.keywordEnabled) {
			this.learnedKeywords = this.ai.getCollection('_keyword_learnedKeywords', {
				indices: ['userId']
			});
		}

		setInterval(() => {
			if (Math.random() < 0.04) {
				this.post();
			}
		}, 1000 * 60 * 10);

		return {};
	}

	@autobind
	private post() {
		let visibility = config.defaultVisibility;
		let localOnly = config.defaultlocalOnly;
		if (!visibility) visibility = 'public';

		if (Math.random() * 100 > 50) {
			const getKeyword = (rng: () => number) => {
				if (!this.learnedKeywords) return null;

				const count = this.learnedKeywords.count();
				const offset = Math.floor(rng() * count);

				const x = this.learnedKeywords.chain().find().offset(offset).limit(1).data();
				let keyword = x[0]?.keyword || null;
				if (Math.random() * 100 > 80) keyword = kewyegenabo(keyword);
				return keyword;
			};

		const notes = [
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.want(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.see(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.expire(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.f1(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.f2(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.f3(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.f4(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.f5(item);
				},
				() => {
					const item = genItem(undefined, getKeyword);
					return serifs.noting.f6(item);
				},
			];


			const note = notes[Math.floor(Math.random() * notes.length)];
			this.ai.post({
				visibility: visibility,
				localOnly: localOnly,
				text: note
				() });

			} else {
				const notes = serifs.noting.notes;
				const note = notes[Math.floor(Math.random() * notes.length)];
				this.ai.post({
					visibility: visibility,
					localOnly: localOnly,
					text:
					note });
			}
		}
	}
