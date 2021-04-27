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
      prevED: "https://w3c.github.io/webrtc-stats/archives/20170331/webrtc-stats.html",

      // if there a publicly available Editor's Draft, this is the link
      edDraftURI: "https://w3c.github.io/webrtc-stats/",

      // if this is a LCWD, uncomment and set the end of its review period
      // lcEnd: "2009-08-05",

      // if you want to have extra CSS, append them to this list
      // it is RECOMMENDED that the respec.css stylesheet be kept
      //        extraCSS:             ["ReSpec.js/css/respec.css"],
      //        extraCSS:             ["../../../2009/dap/ReSpec.js/css/respec.css"],

      // editors, add as many as you like
      // only "name" is REQUIRED
      editors: [
        {   name: "Harald Alvestrand",  company: "Google", w3cid: "24610" },
        {   name: "Varun Singh",        company: "callstats.io", w3cid: "85435" },
        {   name: "Henrik Boström",     company: "Google", w3cid: "96936" }
      ],

      // authors, add as many as you like.
      // This is optional, uncomment if you have authors as well as editors.
      // only "name" is REQUIRED. Same format as editors.

      //authors:  [
      //    { name: "Your Name", url: "http://example.org/",
      //      company: "Your Company", companyURL: "http://example.com/" }
      //],

      // shortname of the WG
      group:           "webrtc",
      // name (without the @w3c.org) of the public mailing to which comments are due
      wgPublicList: "public-webrtc",

  xref: ["html", "webrtc", "mediacapture-streams", "webidl", "dom", "hr-time", "infra", "webrtc-extensions"],
      github: "https://github.com/w3c/webrtc-stats",
  testSuiteURI: "https://github.com/web-platform-tests/wpt/tree/master/webrtc-stats",
    implementationReportURI: "https://wpt.fyi/webrtc-stats",
      otherLinks: [
        {
          key: "Participate",
          data: [
            {
              value: "Mailing list",
              href: "https://lists.w3.org/Archives/Public/public-webrtc/"
            }
          ]
        }
      ],
      localBiblio:  {
        "XRBLOCK-STATS": {
            title:    "RTCP XR Metrics for WebRTC",
            href:     "https://datatracker.ietf.org/doc/html/draft-ietf-xrblock-rtcweb-rtcp-xr-metrics",
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
            href:     "https://datatracker.ietf.org/doc/html/draft-reddy-tram-stun-path-data",
            authors:  [
                "T. Reddy",
                "D. Wing",
                "P. Martinsen",
                "V. Singh"
            ],
            status:   "Internet Draft",
            publisher:  "IETF"
        },
        "JSEP": {
		"aliasOf": "RFC8829"
        }
      },
  postProcess: [
    function generateStatsHierarchy(config, doc) {
      const statsIdl = [...document.querySelectorAll("pre.idl")].map(n => n.textContent.slice(6)).join("\n");
      const parsedIdl = WebIDL2.parse(statsIdl);
      const tbody = doc.querySelector("#summary tbody");
      [... tbody.querySelectorAll("tr")].forEach(tr => {
        const dictionaries = [...tr.querySelectorAll("td a")].map(n => Object.assign({}, {href: n.getAttribute("href"), id: n.id, name: n.textContent, level: 0}));
        // add fields, and recursively look up parent dictionaries
        while(dictionaries.find(d => !d.members)) {
          dict = dictionaries.find(d => !d.members);
          if (!dict.href) {
            dict.href = "#dom-" + dict.name.toLowerCase();
          }
          const idlDict = parsedIdl.find(t => t.type === "dictionary" && t.name === dict.name)
          if (!idlDict) {
            console.error("can't find " + dict.name);
            break;
          }
          if (idlDict.inheritance && !dictionaries.find(d => d.name === idlDict.inheritance)) {
            dictionaries.push({name:idlDict.inheritance, level: dict.level + 1})
          }
          dict.members = idlDict.members.map(m => m.name);
        }
        const newTr = document.createElement("tr");
        const th = tr.querySelector("th");
        const allDict = dictionaries.sort((a, b) => b.level - a.level).filter(d => d.members.length);
        th.setAttribute("rowspan", allDict.length);
        newTr.appendChild(th);
        tr.remove();
        let curTr = newTr, i = 0;
        do {
          const dict = allDict[i];
          const dictTd = document.createElement("td");
          const link = document.createElement("a");
          const code = document.createElement("code");
          link.href = dict.href;
          if (dict.id)
            link.id = dict.id;
          code.textContent = dict.name;
          link.appendChild(code);
          dictTd.appendChild(link);
          const fieldTd = document.createElement("td");
          dict.members.forEach(m => {
            const link = document.createElement("a");
            link.href = dict.href + "-" + m.toLowerCase();
            const code = document.createElement("code");
            code.textContent = m;
            link.appendChild(code);
            fieldTd.appendChild(link);
            fieldTd.appendChild(document.createElement("br"));
          });
          curTr.appendChild(dictTd);
          curTr.appendChild(fieldTd);
          i++;
          tbody.appendChild(curTr);
          curTr = doc.createElement("tr");
        } while(i < allDict.length);

      });
    },
    function markFingerprinting () {
        var self = this;
        Array.prototype.forEach.call(
            document.querySelectorAll(".fingerprint"),
            function (el) {
                var img = new Image();
                img.src = "images/fingerprint.png";
                img.alt = "(This is a fingerprinting vector.)";
                img.width = 15;
                img.height = 21;
                el.appendChild(img);
            });
        Array.prototype.forEach.call(
            document.querySelectorAll(".status-ED, .status-not-ED"),
            function (el) {
            if ((el.classList.contains("status-ED") && self.specStatus != "ED")
                || (el.classList.contains("status-not-ED") && self.specStatus == "ED")) {
              el.remove();
            }
          });

    }
  ]
};
