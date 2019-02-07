
This documents describes a test suite that ensures a correct implementation. There are three methods in which we can test the API:
+ API Semantics and Verification: web-platform tests, this checks the correctness of the API semantics and availability of metrics. Most importantly, these tests checks the availability of metrics, and if the metrics are reported in the right format, i.e., in the correct units. However, in some cases, a few metrics may not be fully tested, e.g., Round Trip Time (RTT).
+ Conformance across browsers: Using KITE [KITE], which is a test engine designed to test WebRTC interoperability across browsers. This is especially important to verify if the metrics reported in the RTP Control Protocol (RTCP) Sender Report (SR), Receiver Report (RR), or Extended Reports (XR) are reported correctly. 
+ Correctness and Validation of metrics: Using KITE with a test harness for media and network, checks the correctness of the reported stats.

Tests are split in three parts: API semantics, availability of metrics, and correctness of metrics.

## API Semantics

Tests if the getStats API returns the correct stats object depending on the API input (i.e., filter by senders, etc). Also these tests should check if the reported statistics conform to the peerconnection state machine, i.e., check when obsolete stats are removed when the conditions are met, etc. The test should be carried out in a way that all the RTCStatsType dictionaries are covered, however, in some cases it may make sense to test parts of the media pipeline as a whole, for example sender and receiver transport and media (audio and video) stats.

## Availability of metrics

Tests if all metrics specified as mandatory are returned in the stats. This should be verified against the phases of the peerconnection 

+ When the peer connection is in new state, this is before the call is setup
+ When the peer connection is in connecting state, this is while setting up a call, 
+ When the peer connection is in connected state, this is when a call is established 
+ When the peer connection is in disconnected state, this is when a call has an intermittent connection issue
+ When the peer connection is in failed state, this is when a call is dropped 
+ When the peer connection is in closed state, this is after call has ended.

In every case, the test should produce a connection between two PeerConnections, and call getStats()on them. In these tests, we are mainly verifying three aspects:

1. The stats objects and the corresponding metrics are created in the correct peerconnection phases. 

2. The stats objects and fields are returned in the correct format or type (integer, double, String, etc). Additionally, we are verifying that 

It should be noted that if the getStats API is called at short intervals, they might return cached values. These tests need to make sure that the measurement results are not incorrectly returned because of browser internals caching the result. If specification is unclear on any of these aspects, the specification needs to be updated.

## Correctness of metrics
These set of tests are supposed to validate that the implementation returns valid (close to correct values). For example, that the sent packet counters are increasing and the corresponding received packet counters are less than equal to the sent counters.

Additionally, the validation should take into account when various state changes take place, i.e.,  RTCSignalingState, RTCIceGatheringState, RTCIceConnectionState, RTCPeerConnectionState.


### References
[KITE] KITE is a test engine designed to test WebRTC interoperability across browsers https://github.com/webrtc/KITE
