const withTM = require('next-transpile-modules')([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
])

module.exports = withTM(
  {
    reactStrictMode: true,
    images: {
      domains: ["links.papareact.com","profile.line-scdn.net", "lh3.googleusercontent.com","platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
      "www.pngplay.com","upload.wikimedia.org","www.freepnglogos.com","iconape.com",
      "https://ukbze987lk.execute-api.ap-northeast-1.amazonaws.com"
    ],
    },
  },
)


