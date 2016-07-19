// Import Sass -- Separated at Compile Time
import '../sass/app.scss';

// Import NPM Dependencies
import * as Vue from 'vue';
import * as VueResource from 'vue-resource';

// Tell Vue to use packages
Vue.use(VueResource);

declare const google;
google.load('feeds','1');

( () => {
	Vue.transition('slide_fade', {
		slide_fade(index: number): number {
			return Math.min(300, index * 50)
		}
	})

	const VueContainer = new Vue({
		el: 'html',
		data: {
			title: 'TED Talks',
			feed: [],
			selectedEntry: {},
			entriesPerPage: 10
		},
		methods: {
			initialize():void {
				let feed = new google.feeds.Feed('http://feeds.feedburner.com/TEDTalks_video');
				feed.setNumEntries(this.entriesPerPage);
				feed.load(
					(request):void => {
						console.log(request.feed.entries[0]);
						this.feed = request.feed.entries;
					}
				)
			},
			selectEntry(entry):void {
				this.selectedEntry == entry ? this.selectedEntry = {} : this.selectedEntry = entry;
				// this.selectedEntry = entry;
			}
		},
		ready(){
			google.setOnLoadCallback(this.initialize);
		}
	});

})();
