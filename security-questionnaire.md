# [Security and Privacy Self-Review Questionnaire] for [Identifiers for WebRTC's Statistics API]

## [3.1 Does this specification deal with personally-identifiable information?]

Not beyond what is already exposed in [WebRTC 1.0].

## [3.2 Does this specification deal with high-value data?]

No

## [3.3 Does this specification introduce new state for an origin that persists across browsing sessions?]

No.

## [3.4 Does this specification expose persistent, cross-origin state to the web?]

Not beyond what is already exposed by the [WebRTC 1.0] specification itself

## [3.5 Does this specification expose any other data to an origin that it doesn’t currently have access to?]

The properties exposed by `RTCReceivedRTPStreamStats`, `RTCRemoteInboundRTPStreamStats`, `RTCSentRTPStreamStats`, `RTCOutboundRTPStreamStats`, `RTCRemoteOutboundRTPStreamStats`, `RTCIceCandidatePairStats`, `RTCTransportStats` expose network-layer data not currently available to the JavaScript layer.

In addition, we expect that the behavior of WebRTC Stats (in particular `RTCMediaStreamTrackStats`) on [isolated media streams] (which aren't otherwise available to the JavaScript layer) will need further work (see https://github.com/w3c/webrtc-pc/issues/1613).

## [3.6 Does this specification enable new script execution/loading mechanisms?]

No.

## [3.7 Does this specification allow an origin access to a user’s location?]

Beyond the risks associated with IP addresses as discussed in the WebRTC 1.0 specification, some combination of some of the network properties uniquely exposed by this specification can be correlated with  location.

For instance, the [round-trip time] exposed in `RTCRemoteInboundRTPStreamStats` can give some coarse indication on how far aparts the peers are located, and thus, if one of the peer's location is known, this may reveal information about the other peer.

## [3.8 Does this specification allow an origin access to sensors on a user’s device?]

No

## [3.9 Does this specification allow an origin access to aspects of a user’s local computing environment?]

Not beyond what is already achievable via [getUserMedia] and [WebRTC 1.0].

## [3.10 Does this specification allow an origin access to other devices?]

No

## [3.11 Does this specification allow an origin some measure of control over a user agent’s native UI?]

No.

## [3.12 Does this specification expose temporary identifiers to the web?]

No.

## [3.13 Does this specification distinguish between behavior in first-party and third-party contexts?]

No.

## [3.14 How should this specification work in the context of a user agent’s "incognito" mode?]

No specific behavior defined.

## [3.15 Does this specification persist data to a user’s local device?]

No.

## [3.16 Does this specification have a "Security Considerations" and "Privacy Considerations" section?]

[Yes](https://w3c.github.io/webrtc-stats/webrtc-stats.html#security-considerations).


## [3.17 Does this specification allow downgrading default security characteristics?]

No.


[Security and Privacy Self-Review Questionnaire]: https://w3ctag.github.io/security-questionnaire/
[Identifiers for WebRTC's Statistics API]: https://w3c.github.io/webrtc-stats/webrtc-stats.html
[3.1 Does this specification deal with personally-identifiable information?]: https://w3ctag.github.io/security-questionnaire/#pii
[3.2 Does this specification deal with high-value data?]: https://w3ctag.github.io/security-questionnaire/#credentials
[3.3 Does this specification introduce new state for an origin that persists across browsing sessions?]: https://w3ctag.github.io/security-questionnaire/#persistent-origin-specific-state
[3.4 Does this specification expose persistent, cross-origin state to the web?]: https://w3ctag.github.io/security-questionnaire/#persistent-identifiers
[3.5 Does this specification expose any other data to an origin that it doesn’t currently have access to?]: https://w3ctag.github.io/security-questionnaire/#other-data
[3.6 Does this specification enable new script execution/loading mechanisms?]: https://w3ctag.github.io/security-questionnaire/#string-to-script
[3.7 Does this specification allow an origin access to a user’s location?]: https://w3ctag.github.io/security-questionnaire/#location
[3.8 Does this specification allow an origin access to sensors on a user’s device?]: https://w3ctag.github.io/security-questionnaire/#sensors
[3.9 Does this specification allow an origin access to aspects of a user’s local computing environment?]: https://w3ctag.github.io/security-questionnaire/#local-device
[3.10 Does this specification allow an origin access to other devices?]: https://w3ctag.github.io/security-questionnaire/#remote-device
[3.11 Does this specification allow an origin some measure of control over a user agent’s native UI?]: https://w3ctag.github.io/security-questionnaire/#native-ui
[3.12 Does this specification expose temporary identifiers to the web?]: https://w3ctag.github.io/security-questionnaire/#temporary-id
[3.13 Does this specification distinguish between behavior in first-party and third-party contexts?]: https://w3ctag.github.io/security-questionnaire/#first-third-party
[3.14 How should this specification work in the context of a user agent’s "incognito" mode?]: https://w3ctag.github.io/security-questionnaire/#incognito
[3.15 Does this specification persist data to a user’s local device?]: https://w3ctag.github.io/security-questionnaire/#storage
[3.16 Does this specification have a "Security Considerations" and "Privacy Considerations" section?]: https://w3ctag.github.io/security-questionnaire/#considerations
[3.17 Does this specification allow downgrading default security characteristics?]: https://w3ctag.github.io/security-questionnaire/#relaxed-sop
[WebRTC 1.0]: https://w3c.github.io/webrtc-pc/
[isolated media streams]: https://w3c.github.io/webrtc-pc/#isolated-media-streams
[round-trip time]: https://w3c.github.io/webrtc-stats/webrtc-stats.html#dom-rtcremoteinboundrtpstreamstats-roundtriptime
[getUserMedia]: https://www.w3.org/TR/mediacapture-streams/