

This documents describes a test suite that ensures a correct implementation. Furthermore, when a sufficient browser implementations have completed the test, we can confidently advance the specification to the next standardization stage.

There are three methods in which we can test the API:
1. API Semantics and Verification: web-platform tests, this checks the correctness of the API semantics and availability of metrics. Most importantly, these tests checks the availability of metrics, and if the metrics are reported in the right format, i.e., in the correct units. However, in some cases, a few metrics may not be fully tested, e.g., Round Trip Time (RTT).
2. Conformance across browsers: Using KITE [KITE], which is a test engine designed to test WebRTC interoperability across browsers. This is especially important to verify if the metrics reported in the RTP Control Protocol (RTCP) Sender Report (SR), Receiver Report (RR), or Extended Reports (XR) are reported correctly. 
3. Correctness and Validation of metrics: Using KITE with a test harness for media and network, checks the correctness of the reported stats.

Tests are split in three parts: API semantics, availability of metrics, and correctness of metrics.

## API Semantics

This category of tests verify the correctness of the getStats API, i.e., if the API returns the correct stats object depending on the API input parameters (i.e., filter by senders, etc). Also these tests should check if the reported statistics conform to the peerconnection state machine, i.e., check when obsolete stats are removed when the conditions are met, etc. Each test should verify the content of a single dictionary. However, some tests need to cover multiple parts of the media pipeline, for instance checking that the stats in an RTPSender are consistent with the stats in the corresponding RTPReceiver.

Currently Web Platform Tests [WPT] runs these tests, latest results are available at: https://wpt.fyi/results/webrtc-stats. As of March 2019, 1 test has excellent success rate for all browsers, and the other test has okay results for most browsers.

In addition to WPT, some browser platforms maintain an open test suite, for e.g., [WPT-CHROME].

## Availability of metrics

This category of tests check if all metrics specified as mandatory are returned in the stats object. The checks should take into account when the various state changes take place, i.e.,  RTCSignalingState, RTCIceGatheringState, RTCIceConnectionState, RTCPeerConnectionState. This should be verified against the phases of the peerconnection: 

+ When the peer connection is in new state, this is before the call is setup
+ When the peer connection is in connecting state, this is while setting up a call, 
+ When the peer connection is in connected state, this is when a call is established 
+ When the peer connection is in disconnected state, this is when a call has an intermittent connection issue
+ When the peer connection is in failed state, this is when a call is dropped 
+ When the peer connection is in closed state, this is after call has ended.

In every case, the test should produce a connection between two PeerConnections, and call the getStats API on those peerconnections. We are mainly verifying three aspects with these tests, they are:

1. The stats objects and the corresponding metrics are created in the correct peerconnection phases. 

2. The stats objects and fields are returned in the correct format or type (integer, double, String, etc). Additionally, we are verifying that a value is returned.

It should be noted that if the getStats API is called at short intervals, they might return cached values. These tests need to make sure that the measurement results are not incorrectly returned because of browser internals caching the result. If specification is unclear on any of these aspects, the specification needs to be updated. The spec specifies transitions for which caching is not allowed. The tests need to verify that this restriction is obeyed.

Verification for availability of metrics for Chrome, Firefox, and Safari is available at: https://webrtc-stats.callstats.io/verify/

## Correctness of metrics
These set of tests are supposed to validate that the implementation returns valid (close to correct values). For example, that the sent packet counters are increasing and the corresponding received packet counters are less than equal to the sent counters. The correctness in some cases can be verified via WPT tests. However, in some cases, we will need to run the test through a network emulator or similar to insert network impairments, for example, to measure the correctness round-trip time, jitter, or loss metrics. 

### References
[KITE] KITE is a test engine designed to test WebRTC interoperability across browsers https://github.com/webrtc/KITE
[VERIFY] Verify the getStats() implementation status for different browsers  https://webrtc-stats.callstats.io/verify/
[WPT] Web Platform Test for webrtc-stats https://wpt.fyi/results/webrtc-stats
[WPT-CHROME] Chrome's Web Platform Tests for WebRTC https://cs.chromium.org/chromium/src/third_party/blink/web_tests/external/wpt/webrtc/
