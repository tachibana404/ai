import autobind from 'autobind-decorator';
import Module from '@/module';
import config from '@/config';

export default class extends Module {
	public readonly name = 'welcome';

	@autobind
	public install() {
		if(!config.welcomeEnabled) return {};

		const tl = this.ai.connection.useSharedConnection('localTimeline');

		tl.on('note', this.onLocalNote);

		return {};
	}

	@autobind
	private onLocalNote(note: any) {

		let visibility = config.defaultVisibility;
		let localOnly = config.defaultlocalOnly;
		if (!visibility) visibility = 'public';

		if (note.isFirstNote) {
			setTimeout(() => {
				this.ai.api('notes/create', {
					visibility: visibility,
					localOnly: localOnly,
					text: '新規さんを見つけました！',
					renoteId: note.id
				});
			}, 3000);

			setTimeout(() => {
				this.ai.api('notes/reactions/create', {
					noteId: note.id,
					reaction: 'congrats'
				});
			}, 5000);
		}
	}
}
