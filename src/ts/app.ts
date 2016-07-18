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


	const VueContainer = new Vue({
		el: 'html',
		data: {
			testMessage: 'Vue Webpack Test',
			feeds: [],
			entriesPerPage: 10
		},
		methods: {
			initialize() {
				let feed = new google.feeds.Feed("http://feeds.feedburner.com/TEDTalks_video");
				feed.setNumEntries(this.entriesPerPage);
				feed.load(
					(request) => {
						console.log(request.feed.entries[0]);
						this.feeds = request.feed.entries;
					}
				)
			}
		},
		ready(){
			google.setOnLoadCallback(this.initialize);
		}
	});

})();
