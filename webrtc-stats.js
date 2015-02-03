var respecConfig = {
      // specification status (e.g. WD, LCWD, NOTE, etc.). If in doubt use ED.
      specStatus:           "ED",

      // the specification's short name, as in http://www.w3.org/TR/short-name/
      shortName:            "webrtc-stats",

      // if your specification has a subtitle that goes below the main
      // formal title, define it here
      // subtitle   :  "an excellent document",

      // if you wish the publication date to be other than today, set this
      // publishDate:  "2014-01-27",

      // if the specification's copyright date is a range of years, specify
      // the start date here:
      copyrightStart: "2014",

      // if there is a previously published draft, uncomment this and set its YYYY-MM-DD
      // prevED: "http://dev.w3.org/2011/webrtc/editor/archives/20140321/webrtc.html",

      // if there a publicly available Editor's Draft, this is the link
      edDraftURI: "http://w3c.github.io/webrtc-stats/",

      // if this is a LCWD, uncomment and set the end of its review period
      // lcEnd: "2009-08-05",

      // if you want to have extra CSS, append them to this list
      // it is RECOMMENDED that the respec.css stylesheet be kept
      //        extraCSS:             ["ReSpec.js/css/respec.css"],
      //        extraCSS:             ["../../../2009/dap/ReSpec.js/css/respec.css"],

      // editors, add as many as you like
      // only "name" is REQUIRED
      editors: [
        {   name: "Harald Alvestrand",  company: "Google" },
        {   name: "Varun Singh",        company: "Aalto University" }
      ],

      // authors, add as many as you like.
      // This is optional, uncomment if you have authors as well as editors.
      // only "name" is REQUIRED. Same format as editors.

      //authors:  [
      //    { name: "Your Name", url: "http://example.org/",
      //      company: "Your Company", companyURL: "http://example.com/" }
      //],

      // name of the WG
      wg:           "Web Real-Time Communications Working Group",

      // URI of the public WG page
      wgURI:        "http://www.w3.org/2011/04/webrtc/",

      // name (without the @w3c.org) of the public mailing to which comments are due
      wgPublicList: "public-webrtc",

      // URI of the patent status for this WG, for Rec-track documents
      // !!!! IMPORTANT !!!!
      // This is important for Rec-track documents, do not copy a patent URI from a random
      // document unless you know what you're doing. If in doubt ask your friendly neighbourhood
      // Team Contact.
      // TODO: confirm wgPatentURI
      wgPatentURI:  "http://www.w3.org/2004/01/pp-impl/47318/status",
      localBiblio:  {
        "XRBLOCK-STATS": {
            title:    "RTCP XR Metrics for WebRTC",
            href:     "https://tools.ietf.org/html/draft-ietf-xrblock-rtcweb-rtcp-xr-metrics",
            authors:  [
                "Varun Singh",
                "Rachel Huang",
                "Roni Even",
                "Dan Romascanu",
                "Lingli Deng"
            ],
            status:   "Internet Draft",
            publisher:  "IETF"
        },
        "ECHO": {
          title:  "Digital network echo cancellers",
          href:   "https://www.itu.int/rec/T-REC-G.168/en",
          authors: ["ITU-T G.168"],
          status: "Standard",
          publisher: "ITU-T"
        },
        "STUN-PATH-CHAR": {
          title:    "Discovery of path characteristics using STUN",
            href:     "https://tools.ietf.org/html/draft-reddy-tram-stun-path-data",
            authors:  [
                "T. Reddy",
                "D. Wing",
                "P. Martinsen",
                "V. Singh"
            ],
            status:   "Internet Draft",
            publisher:  "IETF"
        }
      },
    };
