import autobind from 'autobind-decorator';
import Module from '@/module';
import serifs from '@/serifs';
import config from '@/config';

export default class extends Module {
	public readonly name = 'sleepReport';

	@autobind
	public install() {
		this.report();

		return {};
	}

	@autobind
	private report() {
		const now = Date.now();

		const sleepTime = now - this.ai.lastSleepedAt;

		const sleepHours = sleepTime / 1000 / 60 / 60;

		if (sleepHours < 0.1) return;

		let visibility = config.defaultVisibility;
		let localOnly = config.defaultlocalOnly;
		if (!visibility) visibility = 'public';

		if (sleepHours >= 1) {
			this.ai.post({
				visibility: visibility,
				localOnly: localOnly,
				text: serifs.sleepReport.report(Math.round(sleepHours))
			});
		} else {
			this.ai.post({
				visibility: visibility,
				localOnly: localOnly,
				text: serifs.sleepReport.reportUtatane
			});
		}
	}
}
