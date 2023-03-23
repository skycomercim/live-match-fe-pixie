# HUDDLE ROOM - LIVE MATCH

## Match status

|   Status   | Get Info | Get Main Events | Events Subscription |
| :--------: | :------: | :-------------: | :-----------------: |
|  prematch  |    Y     |        N        |          Y          |
| firsthalf  |    Y     |        Y        |          Y          |
|  interval  |    Y     |        Y        |          Y          |
| secondhalf |    Y     |        Y        |          Y          |
|  fulltime  |    Y     |        Y        |          N          |

## Events type

|   Status   | Is Main Event | Payload Prop Name |
| :--------: | :-----------: | :---------------: |
|    pass    |       N       |       pass        |
|    goal    |       Y       |       score       |
|  redcard   |       Y       |      redcard      |
| yellowcard |       Y       |    yellowcard     |

Nel caso fosse il secondo _yellowcard_

da capire come gestire, nel flusso degli eventi, i vari inizio/fine tempo, intervallo.
Vengono passati come eventi normali?

quali sarannoi main event?

gol
espulsioni
ammunizioni

ogni evento ha un id univoco?

Quando è goal, il calcolo dello score viene fornito dal BFF o deve calcolarselo il FE?
