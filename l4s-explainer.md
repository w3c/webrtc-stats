<!-- Output copied to clipboard! -->



# Explainer - RFC8888 and L4S stats support in webrtc-stats

This explainer gives the background for the proposal to add stats to webrtc-stats to support the deployment of L4S and its prerequisite reporting format, RFC8888.

(Google-only note: see go/webrtc-l4s for details on what L4S is and why it’s important).


## What is L4S

L4S is a strategy for packet scheduling and marking in the Internet that is intended to make the Internet better for latency-sensitive applications that are capable of and willing to rapidly respond to signals that indicate queue buildup.

The elements constituting L4S, seen from an application, are:



*   The data sender marks outgoing packets with the bit pattern ECT(1) (01) (rather than the default, “no signal” (00)
*   Network elements, when observing queue buildup, change the ECT(1) bit pattern to the CE (Congestion Experienced) bit pattern (11).
*   The data recipient reflects the bits observed on each packet back to the sender, using the RFC8888 reporting format
*   The data sender adjusts its send rate according to the observations in the report 


## What we need to diagnose

There are a number of scenarios we want to diagnose:



*   CE-aware chokepoints: ECT(1) gets sent and received, the occasional CE gets received, and reflected back to the sender, which adjusts bitrate accordingly
*   Bleaching: ECT(1) gets sent, but the recipient sees “No signal”
*   Network drops: Packets marked with ECT(1) get dropped, packets without it get through
*   CE-less chokepoints: We observe packet loss, but no CE markings.

We may also want to look at packet loss vs packet reordering - when packets are lost, the reports will contain loss markings; when packets are reordered, later reports will overlap the previous reports and add info on packets previously lost.


## Suggested counters and where to attach them

The following counters are proposed:

Attached to RTCSentRtpStreamStats:



*   Number of packets sent with normal markings (this can be calculated from PacketsSent - Ect1PacketsSent, so no explicit counter is needed)
*   Number of packets sent with ECT(1) markings

Attached to RTCReceivedRtpStreamStats:



*   Number of packets received with normal markings
*   Number of packets received with ECT(1) marking
*   Number of packets received with CE marking
*   Number of packets reported as lost in RFC8888 reports
*   Number of packets reported as lost in one RFC8888 report but later reported as arrived

Attached to RTCRemoteInboundRtpStreamStats (which is a subclass of RTCReceivedRtpStreamStats):



*   Number of packets sent with ECT(1) but reported as “no marking” (Bleached)

Data in RTCRemoteInboundRtpStreamStats are computed based on a sender’s knowledge of the outgoing packets + data from remote reports (RR or RFC8888 reports). Computing “bleached” packets requires having both info on the sent packet and info on the RFC8888 report available.


## How to diagnose scenarios from these numbers

Diagnosing is performed at the sending endpoint.



*   CE-aware chokepoints: ECT(1) is sent, ECT(1) and CE are in reports, reported ECT(1) + CE + lost add up to number of sent  packets (modulo in-flight). Bleaching stays at zero.
*   Bleaching: ECT(1) is sent, but “no marking” is reported. Number of sent packets and number of received packets + lost are roughly equal.
*   Network drops: Packets sent with normal and ECT(1) are both above zero, but packets received are only normal, not ECT(1), and correspond to the number of normal packets. (NOTE: This is a failure scenario for deploying L4S)
*   CE-less chokepoints: ECT(1) is sent and received, but CE counter remains at zero.

If excessive reordering occurs, the “reported later” counters will go up; the precise interpretation of that number depends on the strategy used for scheduling RFC8888 reports (longer intervals will allow more reordered packets to be recovered without this being visible in the reports).
