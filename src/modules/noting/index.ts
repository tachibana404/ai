import autobind from 'autobind-decorator';
import Module from '@/module';
import serifs from '@/serifs';
import { genItem } from '@/vocabulary';
import config from '@/config';

export default class extends Module {
	public readonly name = 'noting';

	@autobind
	public install() {
		if (config.notingEnabled === false) return {};

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
		const notes = [
			...serifs.noting.notes,
			() => {
				const item = genItem();
				return serifs.noting.want(item);
			},
			() => {
				const item = genItem();
				return serifs.noting.see(item);
			},
			() => {
				const item = genItem();
				return serifs.noting.expire(item);
			},
		];

		const note = notes[Math.floor(Math.random() * notes.length)];

		// TODO: 季節に応じたセリフ

		this.ai.post({
			visibility: visibility,
			localOnly: localOnly,
			text: typeof note === 'function' ? note() : note
		});
	}
}
