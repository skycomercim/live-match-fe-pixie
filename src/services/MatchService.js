import Amplisky, { AppSyncAuthType } from "@sky-uk/ita-js-common-amplisky";
import { MATCHSERVICE_ENDPOINT, MATCHSERVICE_REALTIME, MATCHSERVICE_TOKEN } from "../config/config";
import { matchInfoQuery } from './graphql/queries';
import { MatchEventsSubscription } from './graphql/subscriptions';

class MatchService {
  #matchId;
  #eventsCallback = [];
  #subscription;
  constructor(matchId) {
    this.#matchId = matchId;
    this.amplisky = new Amplisky({
      authConfig: {
        type: AppSyncAuthType.ApiKey,
        params: {
          apiKey: MATCHSERVICE_TOKEN,
        },
      },
      endpoint: MATCHSERVICE_ENDPOINT,
      realtimeEndpoint: MATCHSERVICE_REALTIME,
      realtime: true,
    });
  }

  async getInfo() {
    const { data: { getMatchInfo } } = await this.amplisky.query(matchInfoQuery, { matchId: this.#matchId });
    return getMatchInfo;
  }

  subEvents(callback) {
    this.#eventsCallback.push(callback);
    if(!this.#subscription) {
      this.#subscription = this
        .amplisky
        .subscription(MatchEventsSubscription, { matchId: this.#matchId })
        .subscribe(response => {
        const { data: { onPutEventList: events } } = response;
        this.#eventsCallback.forEach(callback => callback(events));
      });
    }
  }

  unsubEvents() {
    this.#subscription && this.#subscription.unsubscribe();
  }
}

export default MatchService;
