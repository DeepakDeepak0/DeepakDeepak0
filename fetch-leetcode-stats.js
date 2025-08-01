const fs = require("fs");
const https = require("https");

const url = "https://leetcode-rest-api.onrender.com/profile/Deepak_Deepak";

https.get(url, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const json = JSON.parse(data).data;
    const beat = json.problemsSolvedBeatsStats;
    const count = json.submitStatsGlobal.acSubmissionNum;

    const stats = `
### ✅ LeetCode Stats - [Deepak_Deepak](https://leetcode.com/Deepak_Deepak)

📊 **LeetCode Performance**

| Difficulty | Problems Solved | Beats (%) |
|------------|-----------------|-----------|
| 🟢 Easy    | ${count[1].count}             | 🔥 ${beat[0].percentage}% |
| 🟡 Medium  | ${count[2].count}             | 💪 ${beat[1].percentage}% |
| 🔴 Hard    | ${count[3].count}              | ⚔️ ${beat[2].percentage}% |
| 📈 Total   | ${count[0].count}             | -         |
`;

    fs.writeFileSync("leetcode-stats.md", stats.trim());
  });
});
